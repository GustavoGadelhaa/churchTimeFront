import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6">
      <div>
        <h1 class="text-2xl font-bold text-foreground">Dashboard</h1>
        <p class="text-muted-foreground mt-1">Visão geral da sua igreja</p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        @for (card of cards(); track card.label) {
          <div class="rounded-lg border border-border bg-card p-6 transition-all duration-200 hover:shadow-md hover:border-primary/30">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm font-medium text-muted-foreground">{{ card.label }}</p>
                <p class="text-3xl font-bold mt-1 text-foreground">{{ card.value }}</p>
              </div>
              <div class="w-12 h-12 rounded-xl flex items-center justify-center" [class]="card.bgClass">
                <span class="material-icons">{{ card.icon }}</span>
              </div>
            </div>
            <p class="text-xs text-muted-foreground mt-3">{{ card.footer }}</p>
          </div>
        }
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="rounded-lg border border-border bg-card p-6">
          <h2 class="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h2>
          <div class="grid grid-cols-2 gap-3">
            <a routerLink="/events" class="flex flex-col items-center gap-2 p-4 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <span class="material-icons text-2xl">event</span>
              <span class="text-sm font-medium">Novo Evento</span>
            </a>
            <a routerLink="/groups" class="flex flex-col items-center gap-2 p-4 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition-colors">
              <span class="material-icons text-2xl">groups</span>
              <span class="text-sm font-medium">Ver Grupos</span>
            </a>
            <a routerLink="/users" class="flex flex-col items-center gap-2 p-4 rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
              <span class="material-icons text-2xl">people</span>
              <span class="text-sm font-medium">Usuários</span>
            </a>
            <a routerLink="/presence/checkin" class="flex flex-col items-center gap-2 p-4 rounded-lg border border-border text-foreground hover:bg-accent transition-colors">
              <span class="material-icons text-2xl">check_circle</span>
              <span class="text-sm font-medium">Check-in</span>
            </a>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-card p-6">
          <h2 class="text-lg font-semibold text-foreground mb-4">Bem-vindo ao ChurchTime!</h2>
          <div class="space-y-3">
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <span class="material-icons text-primary mt-0.5">info</span>
              <div>
                <p class="text-sm font-medium text-foreground">Gerencie seus grupos</p>
                <p class="text-xs text-muted-foreground">Crie células, ministérios e organize membros</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <span class="material-icons text-primary mt-0.5">event</span>
              <div>
                <p class="text-sm font-medium text-foreground">Crie eventos</p>
                <p class="text-xs text-muted-foreground">Agende cultos, reuniões e acompanhe presenças</p>
              </div>
            </div>
            <div class="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
              <span class="material-icons text-green-500 mt-0.5">check_circle</span>
              <div>
                <p class="text-sm font-medium text-foreground">Check-in fácil</p>
                <p class="text-xs text-muted-foreground">Membros fazem check-in em eventos abertos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {
  cards = signal([
    {
      label: 'Total de Grupos',
      value: '0',
      footer: 'Células e ministérios',
      icon: 'groups',
      bgClass: 'bg-primary/15 text-primary'
    },
    {
      label: 'Eventos Abertos',
      value: '0',
      footer: 'Prontos para check-in',
      icon: 'event',
      bgClass: 'bg-green-500/15 text-green-500'
    },
    {
      label: 'Membros Ativos',
      value: '0',
      footer: 'Cadastrados no sistema',
      icon: 'people',
      bgClass: 'bg-primary/15 text-primary'
    },
    {
      label: 'Presenças Hoje',
      value: '0',
      footer: 'Check-ins realizados',
      icon: 'check_circle',
      bgClass: 'bg-yellow-500/15 text-yellow-500'
    }
  ]);
}
