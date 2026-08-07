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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      causas_raiz: {
        Row: {
          categoria: Database["public"]["Enums"]["causa_categoria"]
          created_at: string
          criticidade: Database["public"]["Enums"]["criticidade"]
          descricao: string | null
          id: string
          nome: string
          status: Database["public"]["Enums"]["causa_status"]
          updated_at: string
          user_id: string
        }
        Insert: {
          categoria?: Database["public"]["Enums"]["causa_categoria"]
          created_at?: string
          criticidade?: Database["public"]["Enums"]["criticidade"]
          descricao?: string | null
          id?: string
          nome: string
          status?: Database["public"]["Enums"]["causa_status"]
          updated_at?: string
          user_id: string
        }
        Update: {
          categoria?: Database["public"]["Enums"]["causa_categoria"]
          created_at?: string
          criticidade?: Database["public"]["Enums"]["criticidade"]
          descricao?: string | null
          id?: string
          nome?: string
          status?: Database["public"]["Enums"]["causa_status"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      decisoes_economicas: {
        Row: {
          cct_a: number | null
          cct_b: number | null
          cenario: Database["public"]["Enums"]["cenario_mdeo"]
          created_at: string
          custos_a: Json
          custos_b: Json
          epi: number | null
          horizonte_meses: number
          id: string
          investimento_inicial_a: number
          observacoes: string | null
          payback_meses: number | null
          premissas: Json
          recomendacao: Database["public"]["Enums"]["recomendacao_mdeo"] | null
          roc: number | null
          status: Database["public"]["Enums"]["decisao_status"]
          titulo: string
          updated_at: string
          user_id: string
        }
        Insert: {
          cct_a?: number | null
          cct_b?: number | null
          cenario: Database["public"]["Enums"]["cenario_mdeo"]
          created_at?: string
          custos_a?: Json
          custos_b?: Json
          epi?: number | null
          horizonte_meses?: number
          id?: string
          investimento_inicial_a?: number
          observacoes?: string | null
          payback_meses?: number | null
          premissas?: Json
          recomendacao?: Database["public"]["Enums"]["recomendacao_mdeo"] | null
          roc?: number | null
          status?: Database["public"]["Enums"]["decisao_status"]
          titulo: string
          updated_at?: string
          user_id: string
        }
        Update: {
          cct_a?: number | null
          cct_b?: number | null
          cenario?: Database["public"]["Enums"]["cenario_mdeo"]
          created_at?: string
          custos_a?: Json
          custos_b?: Json
          epi?: number | null
          horizonte_meses?: number
          id?: string
          investimento_inicial_a?: number
          observacoes?: string | null
          payback_meses?: number | null
          premissas?: Json
          recomendacao?: Database["public"]["Enums"]["recomendacao_mdeo"] | null
          roc?: number | null
          status?: Database["public"]["Enums"]["decisao_status"]
          titulo?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      ecos: {
        Row: {
          categoria: Database["public"]["Enums"]["eco_categoria"]
          causa_raiz_id: string | null
          consequencia: Database["public"]["Enums"]["consequencia_enum"] | null
          created_at: string
          data_evento: string
          data_inicio_causa: string | null
          decisao_mdeo_id: string | null
          descricao: string | null
          dominio: Database["public"]["Enums"]["dominio_enum"] | null
          ico: number | null
          id: string
          impacto: number
          mecanismo: Database["public"]["Enums"]["mecanismo_enum"] | null
          observacoes: string | null
          padrao_codigo: string | null
          persistencia: number
          recorrencia: number
          responsavel: string | null
          titulo: string
          updated_at: string
          user_id: string
          valor_prejuizo: number
        }
        Insert: {
          categoria?: Database["public"]["Enums"]["eco_categoria"]
          causa_raiz_id?: string | null
          consequencia?: Database["public"]["Enums"]["consequencia_enum"] | null
          created_at?: string
          data_evento?: string
          data_inicio_causa?: string | null
          decisao_mdeo_id?: string | null
          descricao?: string | null
          dominio?: Database["public"]["Enums"]["dominio_enum"] | null
          ico?: number | null
          id?: string
          impacto: number
          mecanismo?: Database["public"]["Enums"]["mecanismo_enum"] | null
          observacoes?: string | null
          padrao_codigo?: string | null
          persistencia: number
          recorrencia: number
          responsavel?: string | null
          titulo: string
          updated_at?: string
          user_id: string
          valor_prejuizo?: number
        }
        Update: {
          categoria?: Database["public"]["Enums"]["eco_categoria"]
          causa_raiz_id?: string | null
          consequencia?: Database["public"]["Enums"]["consequencia_enum"] | null
          created_at?: string
          data_evento?: string
          data_inicio_causa?: string | null
          decisao_mdeo_id?: string | null
          descricao?: string | null
          dominio?: Database["public"]["Enums"]["dominio_enum"] | null
          ico?: number | null
          id?: string
          impacto?: number
          mecanismo?: Database["public"]["Enums"]["mecanismo_enum"] | null
          observacoes?: string | null
          padrao_codigo?: string | null
          persistencia?: number
          recorrencia?: number
          responsavel?: string | null
          titulo?: string
          updated_at?: string
          user_id?: string
          valor_prejuizo?: number
        }
        Relationships: [
          {
            foreignKeyName: "ecos_causa_raiz_id_fkey"
            columns: ["causa_raiz_id"]
            isOneToOne: false
            referencedRelation: "causas_raiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecos_decisao_mdeo_id_fkey"
            columns: ["decisao_mdeo_id"]
            isOneToOne: false
            referencedRelation: "decisoes_economicas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ecos_padrao_codigo_fkey"
            columns: ["padrao_codigo"]
            isOneToOne: false
            referencedRelation: "padroes_biblioteca"
            referencedColumns: ["codigo"]
          },
        ]
      }
      obras_pesquisa: {
        Row: {
          created_at: string
          data_inicio: string
          dono_id: string
          grupo: Database["public"]["Enums"]["grupo_pesquisa"]
          id: string
          nome: string
          observacoes: string | null
          status: Database["public"]["Enums"]["status_obra_pesquisa"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          data_inicio?: string
          dono_id?: string
          grupo: Database["public"]["Enums"]["grupo_pesquisa"]
          id?: string
          nome: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_obra_pesquisa"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          data_inicio?: string
          dono_id?: string
          grupo?: Database["public"]["Enums"]["grupo_pesquisa"]
          id?: string
          nome?: string
          observacoes?: string | null
          status?: Database["public"]["Enums"]["status_obra_pesquisa"]
          updated_at?: string
        }
        Relationships: []
      }
      padroes_biblioteca: {
        Row: {
          acao_curto: string | null
          acao_estruturante: string | null
          acao_medio: string | null
          ativo: boolean
          codigo: string
          consequencia: Database["public"]["Enums"]["consequencia_enum"]
          created_at: string
          dominio: Database["public"]["Enums"]["dominio_enum"]
          fenomeno_universal: string
          mecanismo: Database["public"]["Enums"]["mecanismo_enum"]
          nome: string
          sugestao_causa_categoria: string
          sugestao_causa_nome: string
          updated_at: string
        }
        Insert: {
          acao_curto?: string | null
          acao_estruturante?: string | null
          acao_medio?: string | null
          ativo?: boolean
          codigo: string
          consequencia: Database["public"]["Enums"]["consequencia_enum"]
          created_at?: string
          dominio: Database["public"]["Enums"]["dominio_enum"]
          fenomeno_universal: string
          mecanismo: Database["public"]["Enums"]["mecanismo_enum"]
          nome: string
          sugestao_causa_categoria: string
          sugestao_causa_nome: string
          updated_at?: string
        }
        Update: {
          acao_curto?: string | null
          acao_estruturante?: string | null
          acao_medio?: string | null
          ativo?: boolean
          codigo?: string
          consequencia?: Database["public"]["Enums"]["consequencia_enum"]
          created_at?: string
          dominio?: Database["public"]["Enums"]["dominio_enum"]
          fenomeno_universal?: string
          mecanismo?: Database["public"]["Enums"]["mecanismo_enum"]
          nome?: string
          sugestao_causa_categoria?: string
          sugestao_causa_nome?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          display_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recomendacoes: {
        Row: {
          acao: string
          causa_raiz_id: string
          created_at: string
          id: string
          origem: string
          prazo: Database["public"]["Enums"]["prazo_recomendacao"]
          prazo_dias: number | null
          responsavel_sugerido: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          acao: string
          causa_raiz_id: string
          created_at?: string
          id?: string
          origem?: string
          prazo: Database["public"]["Enums"]["prazo_recomendacao"]
          prazo_dias?: number | null
          responsavel_sugerido?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          acao?: string
          causa_raiz_id?: string
          created_at?: string
          id?: string
          origem?: string
          prazo?: Database["public"]["Enums"]["prazo_recomendacao"]
          prazo_dias?: number | null
          responsavel_sugerido?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_causa_raiz_id_fkey"
            columns: ["causa_raiz_id"]
            isOneToOne: false
            referencedRelation: "causas_raiz"
            referencedColumns: ["id"]
          },
        ]
      }
      recomendacoes_implementadas: {
        Row: {
          causa_raiz_id: string
          created_at: string
          ico_antes: number | null
          ico_depois: number | null
          id: string
          implementada_em: string
          observacoes: string | null
          recomendacao_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          causa_raiz_id: string
          created_at?: string
          ico_antes?: number | null
          ico_depois?: number | null
          id?: string
          implementada_em?: string
          observacoes?: string | null
          recomendacao_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          causa_raiz_id?: string
          created_at?: string
          ico_antes?: number | null
          ico_depois?: number | null
          id?: string
          implementada_em?: string
          observacoes?: string | null
          recomendacao_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recomendacoes_implementadas_causa_raiz_id_fkey"
            columns: ["causa_raiz_id"]
            isOneToOne: false
            referencedRelation: "causas_raiz"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recomendacoes_implementadas_recomendacao_id_fkey"
            columns: ["recomendacao_id"]
            isOneToOne: false
            referencedRelation: "recomendacoes"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      vw_capital_preservado: {
        Row: {
          capital_preservado: number | null
          epi_mes: number | null
          user_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "analista" | "gestor" | "cliente"
      causa_categoria:
        | "processo"
        | "pessoas"
        | "fornecedor"
        | "projeto"
        | "gestao"
        | "comunicacao"
        | "outros"
      causa_status: "ativa" | "monitorando" | "resolvida" | "arquivada"
      cenario_mdeo:
        | "aluguel_vs_compra"
        | "terceirizacao_vs_proprio"
        | "corretiva_vs_preventiva"
        | "estoque_vs_jit"
        | "capacitacao_vs_substituicao"
        | "vista_vs_parcelado"
        | "internalizar_vs_subcontratar"
      consequencia_enum:
        | "atraso"
        | "retrabalho"
        | "desperdicio"
        | "ociosidade"
        | "compra_emergencial"
        | "multa"
        | "paralisacao"
        | "perda_de_margem"
      criticidade: "baixa" | "media" | "alta" | "critica"
      decisao_status: "rascunho" | "aprovada" | "descartada"
      dominio_enum:
        | "projeto"
        | "suprimentos"
        | "execucao"
        | "gestao"
        | "cliente"
        | "ambiente"
        | "financeiro"
        | "compliance"
      eco_categoria:
        | "retrabalho"
        | "compra_emergencial"
        | "atraso"
        | "falha_comunicacao"
        | "falta_material"
        | "equipamento_parado"
        | "erro_execucao"
        | "erro_projeto"
        | "aprovacao_lenta"
        | "outros"
      grupo_pesquisa: "piloto" | "controle"
      mecanismo_enum:
        | "tempo"
        | "informacao"
        | "capital"
        | "material"
        | "equipamento"
        | "comunicacao"
        | "qualidade"
        | "mao_de_obra"
      prazo_recomendacao: "curto" | "medio" | "estruturante"
      recomendacao_mdeo: "opcao_a" | "opcao_b" | "revisar"
      status_obra_pesquisa: "ativa" | "finalizada" | "desistente"
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
      app_role: ["admin", "analista", "gestor", "cliente"],
      causa_categoria: [
        "processo",
        "pessoas",
        "fornecedor",
        "projeto",
        "gestao",
        "comunicacao",
        "outros",
      ],
      causa_status: ["ativa", "monitorando", "resolvida", "arquivada"],
      cenario_mdeo: [
        "aluguel_vs_compra",
        "terceirizacao_vs_proprio",
        "corretiva_vs_preventiva",
        "estoque_vs_jit",
        "capacitacao_vs_substituicao",
        "vista_vs_parcelado",
        "internalizar_vs_subcontratar",
      ],
      consequencia_enum: [
        "atraso",
        "retrabalho",
        "desperdicio",
        "ociosidade",
        "compra_emergencial",
        "multa",
        "paralisacao",
        "perda_de_margem",
      ],
      criticidade: ["baixa", "media", "alta", "critica"],
      decisao_status: ["rascunho", "aprovada", "descartada"],
      dominio_enum: [
        "projeto",
        "suprimentos",
        "execucao",
        "gestao",
        "cliente",
        "ambiente",
        "financeiro",
        "compliance",
      ],
      eco_categoria: [
        "retrabalho",
        "compra_emergencial",
        "atraso",
        "falha_comunicacao",
        "falta_material",
        "equipamento_parado",
        "erro_execucao",
        "erro_projeto",
        "aprovacao_lenta",
        "outros",
      ],
      grupo_pesquisa: ["piloto", "controle"],
      mecanismo_enum: [
        "tempo",
        "informacao",
        "capital",
        "material",
        "equipamento",
        "comunicacao",
        "qualidade",
        "mao_de_obra",
      ],
      prazo_recomendacao: ["curto", "medio", "estruturante"],
      recomendacao_mdeo: ["opcao_a", "opcao_b", "revisar"],
      status_obra_pesquisa: ["ativa", "finalizada", "desistente"],
    },
  },
} as const
