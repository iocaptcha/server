import axios, { type AxiosInstance, type AxiosProxyConfig } from 'axios'
import type { ScoreRequest, ScoreResponse } from './interfaces'

export interface Proxy {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
  protocol?: string
}
export interface Config {
  api_base_url: string
  timeout: number
  proxy: Proxy | null
}
export const CONFIG: Config = {
  api_base_url: 'https://hook.iocaptcha.com/api/v1',
  timeout: 10000,
  proxy: null
}

export interface ApiConfig {
  // Provide your endpoint public key
  endpoint_public_key: string
  // Provide your endpoint private key
  endpoint_private_key: string
}
export class Api {
  public http: AxiosInstance
  public config: ApiConfig
  constructor (config: ApiConfig) {
    this.config = config
    this.http = axios.create({
      baseURL: CONFIG.api_base_url,
      timeout: CONFIG.timeout,
      proxy: CONFIG.proxy as AxiosProxyConfig
    })
  }

  /**
   * Try to authenticate yourself with the API.
   * Recommended to run this on startup, to check whether your configuration is correct.
   */
  public async authenticate (): Promise<boolean> {
    const response = await this.http.post('/auth/endpoint', {}, {
      headers: {
        'Content-Type': 'application/json',
        'X-Endpoint-Public-Key': this.config.endpoint_public_key,
        'X-Endpoint-Private-Key': this.config.endpoint_private_key
      }
    });

    if (response.status !== 200) {
      console.warn('Authentication failed. Please check your endpoint keys.\n', response.data);
    }

    return response.status === 200
  }

  /**
   *
   * @param data - The ScoreRequest interface, or pass_uuid.
   */
  public async validate (data: string | ScoreRequest): Promise<ScoreResponse> {
    if (typeof data === 'string') {
      data = {
        token: data,
        invalidate: true
      }
    }

    const response = await this.http.post<ScoreResponse>('/score', data,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Endpoint-Public-Key': this.config.endpoint_public_key,
          'X-Endpoint-Private-Key': this.config.endpoint_private_key
        }
      }
    )

    return response.data
  }
}
