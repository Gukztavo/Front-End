import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ServerConfigService {
    private baseUrl: string = 'http://10.20.8.24:21500'; // URL padrão

    setBaseUrl(ip: string, port: string): void {
        this.baseUrl = `http://${ip}:${port}`;
        console.log(`Base URL atualizada para: ${this.baseUrl}`);
    }
    getBaseUrl(): string {
        return this.baseUrl;
    }
}
