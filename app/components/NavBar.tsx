import { NavLink } from '@remix-run/react';


export default function NavBar() {
	
	const links = [
		{ name: 'Home'   , href: '/'      },
		{ name: 'Page 1' , href: '/page1' },
		{ name: 'Page 2' , href: '/page2' },
		{ name: 'Page 3' , href: '/page3' },
	]
	
	return (
		<div className='w-full flex justify-center bg-gray-800'>
			<div className="w-full max-w-[1440px] h-16 flex justify-between items-center">
				
				<div className='flex gap-2.5'>
					{ links.map( (link) => 
						<MyNavItem text={link.name} href={link.href} key={link.name}/>
					)}
				</div>
				
				<div className="right">
					<MyNavItem text="Login" href="/login" />
				</div>
				
			</div>
			
			
		</div>
	)
}
function MyNavItem( { text , href } : { text:string , href:string } ){
	return(
		<NavLink 
			to={href} 
			className={({ isActive, isPending }) =>
				'rounded-md px-3 py-2 text-sm font-medium' 
				+ (isActive 
					? ' bg-gray-900 text-white' 
					: ' text-gray-300 hover:bg-gray-700 hover:text-white'
				)
			}
			>
			{text}
		</NavLink>	
	);
}