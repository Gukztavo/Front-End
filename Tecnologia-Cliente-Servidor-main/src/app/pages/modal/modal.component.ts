import { Component, EventEmitter, Output } from '@angular/core';
import { ServerConfigService } from '../../services/server-config.service'
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html', // Arquivo HTML separado
  styleUrls: ['./modal.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
   ] // Arquivo CSS/SCSS separado
})
export class ServerModalComponent {
  ip: string = '';
  port: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  constructor(private serverConfigService: ServerConfigService) {}

  saveConfig(): void {
    if (this.ip && this.port) {
      this.serverConfigService.setBaseUrl(this.ip, this.port);
      alert('Servidor atualizado com sucesso!');
    } else {
      alert('Por favor, preencha o IP e a porta.');
    }
    this.closeModal.emit();
  }
}
