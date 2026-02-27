import axios, { AxiosInstance, AxiosResponse } from "axios";

export class APIClient {
  private client: AxiosInstance;
  private lastResponse: AxiosResponse | null = null;

  constructor(baseURL: string) {
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: () => true, // Don't throw on any status code
    });
  }

  async get(endpoint: string): Promise<AxiosResponse> {
    try {
      this.lastResponse = await this.client.get(endpoint);
      console.log(`✓ GET ${endpoint} - Status: ${this.lastResponse!.status}`);
      return this.lastResponse!;
    } catch (error) {
      console.error(`✗ GET ${endpoint} failed:`, error);
      throw error;
    }
  }

  async post(endpoint: string, data: any): Promise<AxiosResponse> {
    try {
      this.lastResponse = await this.client.post(endpoint, data);
      console.log(`✓ POST ${endpoint} - Status: ${this.lastResponse!.status}`);
      return this.lastResponse!;
    } catch (error) {
      console.error(`✗ POST ${endpoint} failed:`, error);
      throw error;
    }
  }

  async put(endpoint: string, data: any): Promise<AxiosResponse> {
    try {
      this.lastResponse = await this.client.put(endpoint, data);
      console.log(`✓ PUT ${endpoint} - Status: ${this.lastResponse!.status}`);
      return this.lastResponse!;
    } catch (error) {
      console.error(`✗ PUT ${endpoint} failed:`, error);
      throw error;
    }
  }

  async delete(endpoint: string): Promise<AxiosResponse> {
    try {
      this.lastResponse = await this.client.delete(endpoint);
      console.log(`✓ DELETE ${endpoint} - Status: ${this.lastResponse!.status}`);
      return this.lastResponse!;
    } catch (error) {
      console.error(`✗ DELETE ${endpoint} failed:`, error);
      throw error;
    }
  }

  getLastResponse(): AxiosResponse | null {
    return this.lastResponse;
  }

  getLastResponseStatus(): number | null {
    return this.lastResponse?.status ?? null;
  }

  getLastResponseData(): any {
    return this.lastResponse?.data ?? null;
  }
}
