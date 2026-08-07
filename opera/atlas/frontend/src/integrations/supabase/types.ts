export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      acoes_corretivas: {
        Row: {
          created_at: string
          descricao: string
          foto_url: string | null
          id: string
          obra_id: string
          pilar: string
          prazo: string | null
          prioridade: string
          responsavel: string | null
          status: string
          tenant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao: string
          foto_url?: string | null
          id?: string
          obra_id: string
          pilar?: string
          prazo?: string | null
          prioridade?: string
          responsavel?: string | null
          status?: string
          tenant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string
          foto_url?: string | null
          id?: string
          obra_id?: string
          pilar?: string
          prazo?: string | null
          prioridade?: string
          responsavel?: string | null
          status?: string
          tenant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "acoes_corretivas_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "acoes_corretivas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      aditivos_contratuais: {
        Row: {
          aprovado: boolean
          created_at: string
          data: string
          descricao: string
          id: string
          obra_id: string
          tenant_id: string
          tipo: string
          valor: number
        }
        Insert: {
          aprovado?: boolean
          created_at?: string
          data?: string
          descricao: string
          id?: string
          obra_id: string
          tenant_id: string
          tipo?: string
          valor?: number
        }
        Update: {
          aprovado?: boolean
          created_at?: string
          data?: string
          descricao?: string
          id?: string
          obra_id?: string
          tenant_id?: string
          tipo?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "aditivos_contratuais_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "aditivos_contratuais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      apontamento_diarias: {
        Row: {
          colaborador_id: string
          created_at: string
          deleted_at: string | null
          id: string
          obra_id: string
          observacao: string | null
          periodo_fim: string
          periodo_inicio: string
          quantidade_diarias: number
          tenant_id: string
          tipo: string
          updated_at: string
          updated_by: string | null
          valor_diaria: number
        }
        Insert: {
          colaborador_id: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          obra_id: string
          observacao?: string | null
          periodo_fim?: string
          periodo_inicio?: string
          quantidade_diarias?: number
          tenant_id: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor_diaria?: number
        }
        Update: {
          colaborador_id?: string
          created_at?: string
          deleted_at?: string | null
          id?: string
          obra_id?: string
          observacao?: string | null
          periodo_fim?: string
          periodo_inicio?: string
          quantidade_diarias?: number
          tenant_id?: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor_diaria?: number
        }
        Relationships: [
          {
            foreignKeyName: "apontamento_diarias_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apontamento_diarias_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "apontamento_diarias_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      atividade_dependencias: {
        Row: {
          created_at: string
          id: string
          lag_dias: number
          obra_id: string
          predecessora_id: string
          sucessora_id: string
          tenant_id: string
          tipo: string
        }
        Insert: {
          created_at?: string
          id?: string
          lag_dias?: number
          obra_id: string
          predecessora_id: string
          sucessora_id: string
          tenant_id: string
          tipo?: string
        }
        Update: {
          created_at?: string
          id?: string
          lag_dias?: number
          obra_id?: string
          predecessora_id?: string
          sucessora_id?: string
          tenant_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "atividade_dependencias_predecessora_id_fkey"
            columns: ["predecessora_id"]
            isOneToOne: false
            referencedRelation: "atividades"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "atividade_dependencias_sucessora_id_fkey"
            columns: ["sucessora_id"]
            isOneToOne: false
            referencedRelation: "atividades"
            referencedColumns: ["id"]
          },
        ]
      }
      atividades: {
        Row: {
          cor: string | null
          created_at: string
          data_fim: string
          data_inicio: string
          deleted_at: string | null
          descricao: string | null
          id: string
          nome: string
          obra_id: string
          ordem: number
          parent_id: string | null
          progresso: number
          responsavel: string | null
          tenant_id: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cor?: string | null
          created_at?: string
          data_fim: string
          data_inicio: string
          deleted_at?: string | null
          descricao?: string | null
          id?: string
          nome: string
          obra_id: string
          ordem?: number
          parent_id?: string | null
          progresso?: number
          responsavel?: string | null
          tenant_id: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cor?: string | null
          created_at?: string
          data_fim?: string
          data_inicio?: string
          deleted_at?: string | null
          descricao?: string | null
          id?: string
          nome?: string
          obra_id?: string
          ordem?: number
          parent_id?: string | null
          progresso?: number
          responsavel?: string | null
          tenant_id?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "atividades_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "atividades"
            referencedColumns: ["id"]
          },
        ]
      }
      ativos: {
        Row: {
          created_at: string
          id: string
          local_atual: string | null
          nome: string
          obra_id: string
          status: string
          tenant_id: string
          valor: number
        }
        Insert: {
          created_at?: string
          id?: string
          local_atual?: string | null
          nome: string
          obra_id: string
          status?: string
          tenant_id: string
          valor?: number
        }
        Update: {
          created_at?: string
          id?: string
          local_atual?: string | null
          nome?: string
          obra_id?: string
          status?: string
          tenant_id?: string
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "ativos_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ativos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          action: string
          causation_id: string | null
          correlation_id: string | null
          created_at: string
          id: string
          metadata: Json | null
          target_id: string | null
          target_type: string | null
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          action: string
          causation_id?: string | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          action?: string
          causation_id?: string | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json | null
          target_id?: string | null
          target_type?: string | null
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs_db: {
        Row: {
          causation_id: string | null
          correlation_id: string | null
          created_at: string
          id: string
          new_data: Json | null
          old_data: Json | null
          operation: string
          row_id: string
          table_name: string
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          causation_id?: string | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation: string
          row_id: string
          table_name: string
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          causation_id?: string | null
          correlation_id?: string | null
          created_at?: string
          id?: string
          new_data?: Json | null
          old_data?: Json | null
          operation?: string
          row_id?: string
          table_name?: string
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      beta_config: {
        Row: {
          beta_ativo: boolean
          id: string
          limite_vagas: number
          lista_espera_ativa: boolean
          tempo_teste_dias: number
          updated_at: string
        }
        Insert: {
          beta_ativo?: boolean
          id?: string
          limite_vagas?: number
          lista_espera_ativa?: boolean
          tempo_teste_dias?: number
          updated_at?: string
        }
        Update: {
          beta_ativo?: boolean
          id?: string
          limite_vagas?: number
          lista_espera_ativa?: boolean
          tempo_teste_dias?: number
          updated_at?: string
        }
        Relationships: []
      }
      beta_waitlist: {
        Row: {
          created_at: string
          email: string
          empresa: string | null
          id: string
          influencer_code: string | null
          nome: string
          status: string
          telefone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          empresa?: string | null
          id?: string
          influencer_code?: string | null
          nome: string
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          empresa?: string | null
          id?: string
          influencer_code?: string | null
          nome?: string
          status?: string
          telefone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      checklist_semanal: {
        Row: {
          created_at: string
          id: string
          item_key: string
          obra_id: string
          observacao: string | null
          semana: string
          tenant_id: string
          updated_at: string
          verificado: boolean
          verificado_por: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          item_key: string
          obra_id: string
          observacao?: string | null
          semana?: string
          tenant_id: string
          updated_at?: string
          verificado?: boolean
          verificado_por?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          item_key?: string
          obra_id?: string
          observacao?: string | null
          semana?: string
          tenant_id?: string
          updated_at?: string
          verificado?: boolean
          verificado_por?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "checklist_semanal_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "checklist_semanal_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      ciclos_tarefa: {
        Row: {
          created_at: string
          data_registro: string
          id: string
          obra_id: string
          qtd_medicoes: number
          tarefa: string
          tempo_alvo_min: number
          tempo_medio_min: number
          tenant_id: string
        }
        Insert: {
          created_at?: string
          data_registro?: string
          id?: string
          obra_id: string
          qtd_medicoes?: number
          tarefa: string
          tempo_alvo_min?: number
          tempo_medio_min?: number
          tenant_id: string
        }
        Update: {
          created_at?: string
          data_registro?: string
          id?: string
          obra_id?: string
          qtd_medicoes?: number
          tarefa?: string
          tempo_alvo_min?: number
          tempo_medio_min?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ciclos_tarefa_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ciclos_tarefa_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      colaborador_obras: {
        Row: {
          ativo: boolean
          colaborador_id: string
          created_at: string
          id: string
          obra_id: string
          tenant_id: string
          valor_diaria_especial: number | null
        }
        Insert: {
          ativo?: boolean
          colaborador_id: string
          created_at?: string
          id?: string
          obra_id: string
          tenant_id: string
          valor_diaria_especial?: number | null
        }
        Update: {
          ativo?: boolean
          colaborador_id?: string
          created_at?: string
          id?: string
          obra_id?: string
          tenant_id?: string
          valor_diaria_especial?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "colaborador_obras_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaborador_obras_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "colaborador_obras_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      colaboradores: {
        Row: {
          ativo: boolean
          categoria: string | null
          created_at: string
          deleted_at: string | null
          id: string
          nome: string
          observacoes: string | null
          pix_chave: string | null
          pix_tipo: string | null
          telefone: string | null
          tenant_id: string
          turno: string
          updated_at: string
          valor_diaria: number
        }
        Insert: {
          ativo?: boolean
          categoria?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          nome: string
          observacoes?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          telefone?: string | null
          tenant_id: string
          turno?: string
          updated_at?: string
          valor_diaria?: number
        }
        Update: {
          ativo?: boolean
          categoria?: string | null
          created_at?: string
          deleted_at?: string | null
          id?: string
          nome?: string
          observacoes?: string | null
          pix_chave?: string | null
          pix_tipo?: string | null
          telefone?: string | null
          tenant_id?: string
          turno?: string
          updated_at?: string
          valor_diaria?: number
        }
        Relationships: [
          {
            foreignKeyName: "colaboradores_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      compras_emergenciais: {
        Row: {
          created_at: string
          data: string
          id: string
          material: string
          motivo: string | null
          obra_id: string
          qtd: number
          tenant_id: string
        }
        Insert: {
          created_at?: string
          data?: string
          id?: string
          material: string
          motivo?: string | null
          obra_id: string
          qtd?: number
          tenant_id: string
        }
        Update: {
          created_at?: string
          data?: string
          id?: string
          material?: string
          motivo?: string | null
          obra_id?: string
          qtd?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "compras_emergenciais_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "compras_emergenciais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      consumo_materiais: {
        Row: {
          created_at: string
          data_registro: string
          id: string
          material: string
          obra_id: string
          previsto: number
          real_consumo: number
          tenant_id: string
          unidade: string
        }
        Insert: {
          created_at?: string
          data_registro?: string
          id?: string
          material: string
          obra_id: string
          previsto?: number
          real_consumo?: number
          tenant_id: string
          unidade?: string
        }
        Update: {
          created_at?: string
          data_registro?: string
          id?: string
          material?: string
          obra_id?: string
          previsto?: number
          real_consumo?: number
          tenant_id?: string
          unidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "consumo_materiais_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "consumo_materiais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      cronograma_baseline: {
        Row: {
          congelado_em: string
          congelado_por: string
          hash: string
          id: string
          motivo: string | null
          obra_id: string
          snapshot_json: Json
          tenant_id: string
          versao: number
        }
        Insert: {
          congelado_em?: string
          congelado_por: string
          hash: string
          id?: string
          motivo?: string | null
          obra_id: string
          snapshot_json: Json
          tenant_id: string
          versao?: number
        }
        Update: {
          congelado_em?: string
          congelado_por?: string
          hash?: string
          id?: string
          motivo?: string | null
          obra_id?: string
          snapshot_json?: Json
          tenant_id?: string
          versao?: number
        }
        Relationships: []
      }
      incidentes_seguranca: {
        Row: {
          created_at: string
          data: string
          descricao: string | null
          id: string
          obra_id: string
          severidade: string
          status: string
          tenant_id: string
          tipo: string
        }
        Insert: {
          created_at?: string
          data?: string
          descricao?: string | null
          id?: string
          obra_id: string
          severidade?: string
          status?: string
          tenant_id: string
          tipo?: string
        }
        Update: {
          created_at?: string
          data?: string
          descricao?: string | null
          id?: string
          obra_id?: string
          severidade?: string
          status?: string
          tenant_id?: string
          tipo?: string
        }
        Relationships: [
          {
            foreignKeyName: "incidentes_seguranca_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "incidentes_seguranca_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      influencer_codes: {
        Row: {
          ativo: boolean
          codigo: string
          created_at: string
          id: string
          nome: string
          total_cadastros: number
          total_convertidos: number
        }
        Insert: {
          ativo?: boolean
          codigo: string
          created_at?: string
          id?: string
          nome: string
          total_cadastros?: number
          total_convertidos?: number
        }
        Update: {
          ativo?: boolean
          codigo?: string
          created_at?: string
          id?: string
          nome?: string
          total_cadastros?: number
          total_convertidos?: number
        }
        Relationships: []
      }
      invites: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          expires_at: string
          id: string
          obra_id: string | null
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          token: string
          used: boolean
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          expires_at?: string
          id?: string
          obra_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          token?: string
          used?: boolean
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          expires_at?: string
          id?: string
          obra_id?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string
          token?: string
          used?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "invites_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invites_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lancamentos_financeiros: {
        Row: {
          created_at: string
          data: string
          deleted_at: string | null
          descricao: string | null
          fornecedor: string | null
          id: string
          obra_id: string
          status_pagamento: string
          tenant_id: string
          tipo: string
          updated_at: string
          updated_by: string | null
          valor: number
        }
        Insert: {
          created_at?: string
          data?: string
          deleted_at?: string | null
          descricao?: string | null
          fornecedor?: string | null
          id?: string
          obra_id: string
          status_pagamento?: string
          tenant_id: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor?: number
        }
        Update: {
          created_at?: string
          data?: string
          deleted_at?: string | null
          descricao?: string | null
          fornecedor?: string | null
          id?: string
          obra_id?: string
          status_pagamento?: string
          tenant_id?: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor?: number
        }
        Relationships: [
          {
            foreignKeyName: "lancamentos_financeiros_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lancamentos_financeiros_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      logistica_interna: {
        Row: {
          created_at: string
          data_registro: string
          destino: string | null
          equipe: string
          id: string
          obra_id: string
          observacao: string | null
          origem: string | null
          tempo_deslocamento_min: number
          tenant_id: string
        }
        Insert: {
          created_at?: string
          data_registro?: string
          destino?: string | null
          equipe: string
          id?: string
          obra_id: string
          observacao?: string | null
          origem?: string | null
          tempo_deslocamento_min?: number
          tenant_id: string
        }
        Update: {
          created_at?: string
          data_registro?: string
          destino?: string | null
          equipe?: string
          id?: string
          obra_id?: string
          observacao?: string | null
          origem?: string | null
          tempo_deslocamento_min?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "logistica_interna_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "logistica_interna_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lote_materiais: {
        Row: {
          created_at: string
          id: string
          lote_id: string
          material: string
          previsto: number
          real_consumo: number
          tenant_id: string
          unidade: string
        }
        Insert: {
          created_at?: string
          id?: string
          lote_id: string
          material: string
          previsto?: number
          real_consumo?: number
          tenant_id: string
          unidade?: string
        }
        Update: {
          created_at?: string
          id?: string
          lote_id?: string
          material?: string
          previsto?: number
          real_consumo?: number
          tenant_id?: string
          unidade?: string
        }
        Relationships: [
          {
            foreignKeyName: "lote_materiais_lote_id_fkey"
            columns: ["lote_id"]
            isOneToOne: false
            referencedRelation: "lotes_consumo"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lote_materiais_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      lotes_consumo: {
        Row: {
          area_executada: number
          atividade: string
          created_at: string
          data_fim: string | null
          data_inicio: string
          id: string
          obra_id: string
          observacao: string | null
          tenant_id: string
          unidade_area: string
        }
        Insert: {
          area_executada?: number
          atividade: string
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          obra_id: string
          observacao?: string | null
          tenant_id: string
          unidade_area?: string
        }
        Update: {
          area_executada?: number
          atividade?: string
          created_at?: string
          data_fim?: string | null
          data_inicio?: string
          id?: string
          obra_id?: string
          observacao?: string | null
          tenant_id?: string
          unidade_area?: string
        }
        Relationships: [
          {
            foreignKeyName: "lotes_consumo_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lotes_consumo_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      mobile_debug_logs: {
        Row: {
          created_at: string | null
          data: Json | null
          event: string
          id: string
          ts: string | null
          ua: string | null
          url: string | null
        }
        Insert: {
          created_at?: string | null
          data?: Json | null
          event: string
          id?: string
          ts?: string | null
          ua?: string | null
          url?: string | null
        }
        Update: {
          created_at?: string | null
          data?: Json | null
          event?: string
          id?: string
          ts?: string | null
          ua?: string | null
          url?: string | null
        }
        Relationships: []
      }
      obra_membros: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          obra_id: string
          tenant_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          obra_id: string
          tenant_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          obra_id?: string
          tenant_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "obra_membros_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "obra_membros_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      obras: {
        Row: {
          abordagem: string
          area_m2: number
          created_at: string
          custo_orcado_m2: number
          data_inicio: string | null
          data_previsao: string | null
          deleted_at: string | null
          descricao: string | null
          endereco: string | null
          fase_atual: string
          id: string
          nome: string
          orcamento_total: number
          responsavel: string | null
          status: string
          tamanho_equipe_esperada: number
          tenant_id: string
          tipo_obra: string
          updated_at: string
        }
        Insert: {
          abordagem?: string
          area_m2?: number
          created_at?: string
          custo_orcado_m2?: number
          data_inicio?: string | null
          data_previsao?: string | null
          deleted_at?: string | null
          descricao?: string | null
          endereco?: string | null
          fase_atual?: string
          id?: string
          nome: string
          orcamento_total?: number
          responsavel?: string | null
          status?: string
          tamanho_equipe_esperada?: number
          tenant_id: string
          tipo_obra?: string
          updated_at?: string
        }
        Update: {
          abordagem?: string
          area_m2?: number
          created_at?: string
          custo_orcado_m2?: number
          data_inicio?: string | null
          data_previsao?: string | null
          deleted_at?: string | null
          descricao?: string | null
          endereco?: string | null
          fase_atual?: string
          id?: string
          nome?: string
          orcamento_total?: number
          responsavel?: string | null
          status?: string
          tamanho_equipe_esperada?: number
          tenant_id?: string
          tipo_obra?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "obras_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      obras_pesquisa: {
        Row: {
          created_at: string
          data_inicio: string
          dono_id: string
          grupo: string
          id: string
          nome: string
          observacoes: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_inicio?: string
          dono_id?: string
          grupo: string
          id?: string
          nome: string
          observacoes?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_inicio?: string
          dono_id?: string
          grupo?: string
          id?: string
          nome?: string
          observacoes?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      periodos_fechados: {
        Row: {
          fechado_em: string
          fechado_por: string
          hash_snapshot: string
          id: string
          mes: string
          motivo: string | null
          motivo_reabertura: string | null
          obra_id: string
          pdf_url: string | null
          reaberto_em: string | null
          reaberto_por: string | null
          snapshot_json: Json | null
          tenant_id: string
          versao: number
        }
        Insert: {
          fechado_em?: string
          fechado_por: string
          hash_snapshot: string
          id?: string
          mes: string
          motivo?: string | null
          motivo_reabertura?: string | null
          obra_id: string
          pdf_url?: string | null
          reaberto_em?: string | null
          reaberto_por?: string | null
          snapshot_json?: Json | null
          tenant_id: string
          versao?: number
        }
        Update: {
          fechado_em?: string
          fechado_por?: string
          hash_snapshot?: string
          id?: string
          mes?: string
          motivo?: string | null
          motivo_reabertura?: string | null
          obra_id?: string
          pdf_url?: string | null
          reaberto_em?: string | null
          reaberto_por?: string | null
          snapshot_json?: Json | null
          tenant_id?: string
          versao?: number
        }
        Relationships: []
      }
      periodos_reaberturas: {
        Row: {
          causation_id: string | null
          correlation_id: string | null
          hash_anterior: string
          hash_novo: string | null
          id: string
          mes: string
          motivo: string
          obra_id: string
          reaberto_em: string
          reaberto_por: string
          refechado_em: string | null
          refechado_por: string | null
          snapshot_anterior_json: Json | null
          tenant_id: string
          versao_anterior: number
          versao_nova: number | null
        }
        Insert: {
          causation_id?: string | null
          correlation_id?: string | null
          hash_anterior: string
          hash_novo?: string | null
          id?: string
          mes: string
          motivo: string
          obra_id: string
          reaberto_em?: string
          reaberto_por: string
          refechado_em?: string | null
          refechado_por?: string | null
          snapshot_anterior_json?: Json | null
          tenant_id: string
          versao_anterior: number
          versao_nova?: number | null
        }
        Update: {
          causation_id?: string | null
          correlation_id?: string | null
          hash_anterior?: string
          hash_novo?: string | null
          id?: string
          mes?: string
          motivo?: string
          obra_id?: string
          reaberto_em?: string
          reaberto_por?: string
          refechado_em?: string | null
          refechado_por?: string | null
          snapshot_anterior_json?: Json | null
          tenant_id?: string
          versao_anterior?: number
          versao_nova?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          account_status: string
          avatar_url: string | null
          beta_approved_at: string | null
          beta_status: string | null
          created_at: string
          email: string
          full_name: string | null
          id: string
          is_super_admin: boolean
          tenant_id: string | null
          updated_at: string
        }
        Insert: {
          account_status?: string
          avatar_url?: string | null
          beta_approved_at?: string | null
          beta_status?: string | null
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          is_super_admin?: boolean
          tenant_id?: string | null
          updated_at?: string
        }
        Update: {
          account_status?: string
          avatar_url?: string | null
          beta_approved_at?: string | null
          beta_status?: string | null
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          is_super_admin?: boolean
          tenant_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      registro_presencas: {
        Row: {
          colaborador_id: string
          created_at: string
          data: string
          fracao_diaria: number
          horas_extra: number | null
          id: string
          obra_id: string
          observacao: string | null
          servico_especial: string | null
          status_contabil: string
          tenant_id: string
          tipo: string
          updated_at: string
          updated_by: string | null
          valor_diaria_especial: number | null
          valor_diaria_usado: number | null
        }
        Insert: {
          colaborador_id: string
          created_at?: string
          data?: string
          fracao_diaria?: number
          horas_extra?: number | null
          id?: string
          obra_id: string
          observacao?: string | null
          servico_especial?: string | null
          status_contabil?: string
          tenant_id: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor_diaria_especial?: number | null
          valor_diaria_usado?: number | null
        }
        Update: {
          colaborador_id?: string
          created_at?: string
          data?: string
          fracao_diaria?: number
          horas_extra?: number | null
          id?: string
          obra_id?: string
          observacao?: string | null
          servico_especial?: string | null
          status_contabil?: string
          tenant_id?: string
          tipo?: string
          updated_at?: string
          updated_by?: string | null
          valor_diaria_especial?: number | null
          valor_diaria_usado?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "registro_presencas_colaborador_id_fkey"
            columns: ["colaborador_id"]
            isOneToOne: false
            referencedRelation: "colaboradores"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_presencas_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registro_presencas_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      registros_diarios: {
        Row: {
          atividade: string | null
          created_at: string
          data_registro: string
          entrada: string | null
          equipe: string | null
          equipe_normalizada: string | null
          id: string
          nome: string
          obra_id: string
          producao: string | null
          producao_valor: number | null
          saida: string | null
          status: string
          tenant_id: string
        }
        Insert: {
          atividade?: string | null
          created_at?: string
          data_registro?: string
          entrada?: string | null
          equipe?: string | null
          equipe_normalizada?: string | null
          id?: string
          nome: string
          obra_id: string
          producao?: string | null
          producao_valor?: number | null
          saida?: string | null
          status?: string
          tenant_id: string
        }
        Update: {
          atividade?: string | null
          created_at?: string
          data_registro?: string
          entrada?: string | null
          equipe?: string | null
          equipe_normalizada?: string | null
          id?: string
          nome?: string
          obra_id?: string
          producao?: string | null
          producao_valor?: number | null
          saida?: string | null
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "registros_diarios_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registros_diarios_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      retrabalhos: {
        Row: {
          created_at: string
          data_registro: string
          descricao: string | null
          etapa: string
          id: string
          obra_id: string
          quantidade: number
          tenant_id: string
        }
        Insert: {
          created_at?: string
          data_registro?: string
          descricao?: string | null
          etapa: string
          id?: string
          obra_id: string
          quantidade?: number
          tenant_id: string
        }
        Update: {
          created_at?: string
          data_registro?: string
          descricao?: string | null
          etapa?: string
          id?: string
          obra_id?: string
          quantidade?: number
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "retrabalhos_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "retrabalhos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      riscos: {
        Row: {
          created_at: string
          id: string
          impacto: string | null
          obra_id: string
          prazo: string | null
          risco: string
          severidade: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          impacto?: string | null
          obra_id: string
          prazo?: string | null
          risco: string
          severidade?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          id?: string
          impacto?: string | null
          obra_id?: string
          prazo?: string | null
          risco?: string
          severidade?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "riscos_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "riscos_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      sequenciamento_equipes: {
        Row: {
          created_at: string
          equipe: string
          id: string
          obra_id: string
          semana_fim: number
          semana_inicio: number
          status: string
          tenant_id: string
        }
        Insert: {
          created_at?: string
          equipe: string
          id?: string
          obra_id: string
          semana_fim: number
          semana_inicio: number
          status?: string
          tenant_id: string
        }
        Update: {
          created_at?: string
          equipe?: string
          id?: string
          obra_id?: string
          semana_fim?: number
          semana_inicio?: number
          status?: string
          tenant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sequenciamento_equipes_obra_id_fkey"
            columns: ["obra_id"]
            isOneToOne: false
            referencedRelation: "obras"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequenciamento_equipes_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      session_transfers: {
        Row: {
          code: string
          created_at: string
          expires_at: string
          id: string
          refresh_token: string
          used: boolean
          user_id: string
        }
        Insert: {
          code: string
          created_at?: string
          expires_at?: string
          id?: string
          refresh_token: string
          used?: boolean
          user_id: string
        }
        Update: {
          code?: string
          created_at?: string
          expires_at?: string
          id?: string
          refresh_token?: string
          used?: boolean
          user_id?: string
        }
        Relationships: []
      }
      system_events: {
        Row: {
          actor_id: string | null
          causation_id: string | null
          correlation_id: string
          created_at: string
          duration_ms: number | null
          error_message: string | null
          event_type: string
          id: string
          obra_id: string | null
          payload: Json
          severity: string
          source: string
          status: string
          tenant_id: string | null
        }
        Insert: {
          actor_id?: string | null
          causation_id?: string | null
          correlation_id: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          event_type: string
          id?: string
          obra_id?: string | null
          payload?: Json
          severity?: string
          source: string
          status?: string
          tenant_id?: string | null
        }
        Update: {
          actor_id?: string | null
          causation_id?: string | null
          correlation_id?: string
          created_at?: string
          duration_ms?: number | null
          error_message?: string | null
          event_type?: string
          id?: string
          obra_id?: string | null
          payload?: Json
          severity?: string
          source?: string
          status?: string
          tenant_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "system_events_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
      tenants: {
        Row: {
          cnpj: string | null
          created_at: string
          id: string
          limite_obras: number
          nome: string
          updated_at: string
        }
        Insert: {
          cnpj?: string | null
          created_at?: string
          id?: string
          limite_obras?: number
          nome: string
          updated_at?: string
        }
        Update: {
          cnpj?: string | null
          created_at?: string
          id?: string
          limite_obras?: number
          nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string | null
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          tenant_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_tenant_id_fkey"
            columns: ["tenant_id"]
            isOneToOne: false
            referencedRelation: "tenants"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      audit_logs_safe: {
        Row: {
          created_at: string | null
          id: string | null
          new_fields_count: number | null
          old_fields_count: number | null
          operation: string | null
          row_id: string | null
          table_name: string | null
          tenant_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string | null
          new_fields_count?: never
          old_fields_count?: never
          operation?: string | null
          row_id?: string | null
          table_name?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string | null
          new_fields_count?: never
          old_fields_count?: never
          operation?: string | null
          row_id?: string | null
          table_name?: string | null
          tenant_id?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      dashboard_aggregates: {
        Args: {
          _end?: string
          _include_finance?: boolean
          _include_safety?: boolean
          _include_score_components?: boolean
          _obra_id?: string
          _start?: string
        }
        Returns: Json
      }
      eficiencia_presenca: {
        Args: { _data?: string; _obra_id: string }
        Returns: {
          eficiencia: number
          esperado: number
          presente: number
        }[]
      }
      folha_pagamento: {
        Args: {
          _colaborador_id?: string
          _data_fim: string
          _data_inicio: string
          _obra_id: string
        }
        Returns: Json
      }
      get_beta_status_by_email: {
        Args: { _email: string }
        Returns: {
          created_at: string
          nome: string
          status: string
        }[]
      }
      get_beta_vagas_ocupadas: { Args: never; Returns: number }
      get_invite_by_token: {
        Args: { _token: string }
        Returns: {
          email: string
          expires_at: string
          id: string
          obra_id: string
          role: Database["public"]["Enums"]["app_role"]
          tenant_id: string
          tenant_nome: string
          used: boolean
        }[]
      }
      get_user_tenant_id: { Args: { _user_id: string }; Returns: string }
      has_any_role: {
        Args: {
          _roles: Database["public"]["Enums"]["app_role"][]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_super_admin: { Args: { _user_id: string }; Returns: boolean }
      jsonb_object_keys_count: { Args: { _obj: Json }; Returns: number }
      listar_historico_periodo: {
        Args: { _mes: string; _obra_id: string }
        Returns: Json
      }
      log_system_event: {
        Args: {
          _causation_id?: string
          _correlation_id: string
          _duration_ms?: number
          _error_message?: string
          _event_type: string
          _obra_id?: string
          _payload?: Json
          _severity?: string
          _source: string
          _status?: string
        }
        Returns: string
      }
      produtividade_por_equipe: {
        Args: { _end?: string; _obra_id: string; _start?: string }
        Returns: {
          dias_trabalhados: number
          equipe: string
          producao_media_dia: number
          producao_total: number
          registros: number
        }[]
      }
      promover_previsoes: { Args: never; Returns: number }
      reabrir_periodo: {
        Args: {
          _correlation_id?: string
          _mes: string
          _motivo: string
          _obra_id: string
        }
        Returns: Json
      }
      refechar_periodo: {
        Args: {
          _correlation_id?: string
          _mes: string
          _obra_id: string
          _reabertura_id: string
        }
        Returns: Json
      }
      set_correlation_context: {
        Args: { _causation_id?: string; _correlation_id: string }
        Returns: undefined
      }
      setup_tenant: { Args: { _cnpj?: string; _nome: string }; Returns: string }
      user_has_obra_access: {
        Args: { _obra_id: string; _user_id: string }
        Returns: boolean
      }
      validar_codigo_influencer: { Args: { _codigo: string }; Returns: boolean }
      validar_fechamento: {
        Args: { _data_fim: string; _data_inicio: string; _obra_id: string }
        Returns: Json
      }
      verificar_hash_periodo: { Args: { _periodo_id: string }; Returns: Json }
    }
    Enums: {
      app_role: "admin" | "gestor" | "operacional" | "visualizador"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "gestor", "operacional", "visualizador"],
    },
  },
} as const
