import { OpenAPIHono } from '@hono/zod-openapi'
import { Scalar } from '@scalar/hono-api-reference'
import { logger } from 'hono/logger'
import { prettyJSON } from 'hono/pretty-json'
import { Home } from './pages/home'
import { Routes } from '#common/types'
import type { HTTPException } from 'hono/http-exception'
import { cors } from 'hono/cors'
export class App {
  private app: OpenAPIHono
  constructor(routes: Routes[]) {
    this.app = new OpenAPIHono()
    this.initializeApp(routes)
  }
  private async initializeApp(routes: Routes[]) {
    try {
      this.initializeGlobalMiddleware()
      this.initializeRoutes(routes)
      this.initializeSwaggerUI()
      this.initializeRouteFallback()
      this.initializeErrorHandler()
    } catch (error) {
      console.error('Failed to initialize application:', error)
      throw new Error('Failed to initialize application')
    }
  }

  private initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      route.initRoutes()
      this.app.route('/api/v1', route.controller)
    })
    this.app.route('/', Home)
  }

  private initializeGlobalMiddleware() {
    this.app.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'OPTIONS']
      })
    )

    this.app.use(logger())
    this.app.use(prettyJSON())
    this.app.use(async (c, next) => {
      const start = Date.now()
      await next()
      const end = Date.now()
      c.res.headers.set('X-Response-Time', `${end - start}ms`)
    })

    // this.app.use(authMiddleware)
  }

  private initializeSwaggerUI(): void {
    // OpenAPI documentation for v1
    this.app.doc31('/swagger', (c) => {
      const { protocol: urlProtocol, hostname, port } = new URL(c.req.url)
      const protocol = c.req.header('x-forwarded-proto') ? `${c.req.header('x-forwarded-proto')}:` : urlProtocol

      return {
        openapi: '3.1.0',
        info: {
          version: '1.0.0',
          title: 'Trackn Fitness API - v1',
          description: `**Trackn Fitness API v1** is a comprehensive and developer-friendly fitness exercise database featuring over 1,500 structured exercises with **GIF-based visual media**. It includes detailed metadata like target muscles, equipment, and body parts, designed for fast integration into fitness apps, personal trainer platforms, and health tools.

**📝 NOTE**: This API provides complete access to exercise data and metadata — making it perfect for fitness applications, workout trackers, and health platforms.`
        },
        servers: [
          {
            url: `${protocol}//${hostname}${port ? `:${port}` : ''}`,
            description:
              'Trackn Fitness API v1\n• Complete exercise database with GIF media\n• Detailed exercise metadata\n• Target muscles, equipment, and body parts\n• Ideal for fitness apps and workout trackers'
          }
        ]
      }
    })

    // API Documentation UI
    this.app.get(
      '/docs',
      Scalar({
        pageTitle: 'Trackn Fitness API - v1',
        theme: 'bluePlanet',
        isEditable: false,
        layout: 'modern',
        darkMode: true,
        hideDownloadButton: true,
        hideDarkModeToggle: false,
        url: '/swagger',
        defaultOpenAllTags: true,
        hideClientButton: true,
        metaData: {
          applicationName: 'Trackn Fitness API - v1',
          author: 'Trackn',
          creator: 'Trackn',
          publisher: 'Trackn',
          ogType: 'website',
          robots: 'index follow',
          description: `**Trackn Fitness API v1** is a comprehensive exercise database offering 1,500+ exercises with rich metadata and GIF visualizations. Built for speed and ease of use, it's ideal for fitness applications, workout trackers, and health platforms.`
        }
      })
    )
  }

  private initializeRouteFallback() {
    this.app.notFound((c) => {
      return c.json(
        {
          success: false,
          message: 'Route not found. Check API documentation at /docs'
        },
        404
      )
    })
  }
  private initializeErrorHandler() {
    this.app.onError((err, c) => {
      const error = err as HTTPException
      console.log(error)
      return c.json({ success: false, message: error.message }, error.status || 500)
    })
  }
  public getApp() {
    return this.app
  }
}
