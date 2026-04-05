import { Component, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { GroupService } from '../../../core/services/group.service';
import { GroupResponse } from '../../../shared/models/group.models';
import { DateFormatPipe } from '../../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-group-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, DateFormatPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="space-y-6 max-w-2xl">
      @if (group(); as g) {
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold text-foreground">{{ g.name }}</h1>
            <p class="text-muted-foreground mt-1">Detalhes do grupo</p>
          </div>
          <div class="flex gap-2">
            <a [routerLink]="['/groups', g.id, 'edit']" class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-primary/30 text-primary hover:bg-primary/10 transition-colors">Editar</a>
            <a routerLink="/groups" class="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 border border-border bg-background hover:bg-accent hover:text-accent-foreground transition-colors">Voltar</a>
          </div>
        </div>

        <div class="rounded-lg border border-border bg-card overflow-hidden">
          <div class="divide-y divide-border">
            @if (g.description) {
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-1">
                <span class="text-sm text-muted-foreground">Descrição</span>
                <span class="text-sm text-foreground">{{ g.description }}</span>
              </div>
            }
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-muted-foreground">Líder</span>
              <span class="text-sm font-semibold text-foreground">{{ g.leaderName || 'Não atribuído' }}</span>
            </div>
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-muted-foreground">Status</span>
              <span class="text-xs px-2.5 py-1 rounded-full font-medium" [class]="g.active ? 'bg-green-500/15 text-green-500' : 'bg-muted text-muted-foreground'">
                {{ g.active ? 'Ativo' : 'Inativo' }}
              </span>
            </div>
            <div class="flex items-center justify-between p-4">
              <span class="text-sm text-muted-foreground">Criado em</span>
              <span class="text-sm font-semibold text-foreground">{{ g.createdAt | dateFormat }}</span>
            </div>
          </div>
        </div>
      } @else {
        <div class="flex justify-center py-12">
          <div class="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        </div>
      }
    </div>
  `
})
export class GroupDetailComponent {
  private groupService = inject(GroupService);
  private route = inject(ActivatedRoute);
  group = signal<GroupResponse | null>(null);

  constructor() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.groupService.getById(id).subscribe({
      next: (data) => this.group.set(data)
    });
  }
}
