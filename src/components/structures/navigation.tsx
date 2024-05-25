import { FunctionComponent } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const links = [
	{
		href: '/',
		label: 'Accueil'
	},
	{
		href: '/careers',
		label: 'Carrières'
	},
	{
		href: '/characteristics',
		label: 'Caractéristiques'
	},
	{
		href: '/skills',
		label: 'Compétences'
	},
	{
		href: '/talents',
		label: 'Talents'
	}
]

const Navigation: FunctionComponent = () => {
	const pathname = usePathname()

	const linkItems = links.map(link => {
		const isActive = link.href === pathname

		const linkStyle = isActive
			? 'active text-blue-500 border-blue-500 pointer-events-none'
			: 'border-transparent hover:border-gray-300 hover:text-gray-300'

		return (
			<li
				key={link.href}
				className='mx-2'
			>
				<Link
					href={link.href}
					className={`inline-block p-4 rounded-t-lg border-b-2 ${linkStyle}`}
					passHref
				>
					{link.label}
				</Link>
			</li>
		)
	})

	return (
		<nav className='w-full flex justify-center text-sm font-medium border-b text-gray-400 border-gray-700'>
			<ul className='flex flex-wrap -mb-px'>
				{linkItems}
			</ul>
		</nav>
	)
}

export default Navigation