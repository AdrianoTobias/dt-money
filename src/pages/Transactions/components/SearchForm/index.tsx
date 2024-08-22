import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { SearchFormContainer } from './styles'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../../../contexts/TransactionsContext'

import { memo } from 'react'
/**
 * Por que um componente renderiza?
 *  - Hooks changed (estado, contexto, reducer)
 *  - Props changed
 *  - Parent rerendered
 * 
 * Qual o fluxo de renderização?
 *  1. O React recria o HTML da interface do componente
 *  2. Compara a versão do HTML recriado com a versão atual
 *  3. SE mudou algo, então reescreve o HTML na tela
 * 
 * Memo:
 *  0. Hooks changed, Props changed (deep comparison)
 *  0.1 Compara a versão anterior dos hooks e das props
 *  0.2 SE mudou algo, então permite a nova renderização
 * 
 * => Nem sempre o memo é mais rápido do que recriar o HTML.
 * => O React já é rápido e renderizar componentes não é um problema,
 * a menos que seja um componente muito grande (em termos de retorno),
 * o qual pode causar lentidão e, neste caso, pode-se utilizar o memo.
 * 
 * ==> As alterações aqui feitas, são somente para demonstrar com o memo funciona.
 */


const searchFormSchema = z.object({
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const fetchTransactions = useContextSelector(
    TransactionsContext,
    context => {
      return context.fetchTransactions
    }
  )

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  async function handleSearchTransactions(data: SearchFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000))

    await fetchTransactions(data.query)
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text" placeholder="Busque por transações" {...register('query')} />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  )
}

export const SearchForm = memo(SearchFormComponent)