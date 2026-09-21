# Cobertura do sensor WhatsApp por empresa

Data: 2026-09-20. Produção consultada read-only.

## Universo editorial observado
O estado público operacional usado pelos perfis é `VISIBLE`, não `PUBLISHED`.

- 10 empresas VISIBLE.
- 1 empresa DRAFT (Jan Motos).
- Das 10 VISIBLE, apenas 3 possuem `commercial_business_links.supplier_id`.
- Cobertura potencial do tracking atual na página curatorial: **3/10 = 30%**.
- 7/10 podem abrir WhatsApp sem produzir o evento atual, porque o código só chama `trackWhatsappClick` depois de resolver supplier_id.

### VISIBLE com vínculo
- Bezerrão Água Gás Gelo
- Canteiro de Obras Digital
- Depósito de Areia do Marcus

### VISIBLE sem vínculo
- Ailton Fretes e Mudanças
- Alex Escavações
- Dirceu Junior Engenharia e Construção
- Elos Materiais
- Ferragens Brasil
- Letroart Comunicação Visual
- Você FM 92.1

Jan Motos permanece DRAFT e não entra no denominador público.

## Implicação
`click_events` é um sensor funcional, porém sua cobertura não representa a rede curatorial. Usar a contagem bruta para comparar empresas criaria viés estrutural: empresas com link supplier são observáveis; as demais são parcialmente invisíveis.

## Decisão
Não exibir “contatos gerados” como métrica comparativa de plano pago enquanto cobertura não for normalizada.

## Opções futuras
A. estender o contrato de tracking para aceitar candidate_id sem exigir supplier_id;
B. criar vínculo supplier para toda empresa elegível, somente se isso fizer sentido no modelo de domínio;
C. criar camada de evento comercial canônica independente das duas identidades e mapear supplier/candidate quando disponíveis.

Não escolher ainda. Primeiro mapear por que existem duas identidades e quais motores dependem de supplier_id.

## Achado de método
Uma métrica pode ser tecnicamente correta e ainda ser comercialmente enganosa quando o mecanismo de observação cobre apenas parte desigual da população. Na Informodinâmica, registrar isso como **viés de observabilidade por topologia**.

Nenhuma mutação em produção.
