import os

pages = [
  {'id': 'bookings', 'title': 'Bookings Management', 'desc': 'Manage equipment rentals and logistics bookings'},
  {'id': 'payments', 'title': 'Payments & Transactions', 'desc': 'Manage invoices and financial records'},
  {'id': 'reviews', 'title': 'Reviews & Ratings', 'desc': 'Moderate user reviews and platform feedback'},
  {'id': 'verification', 'title': 'User Verification', 'desc': 'Review supplier and operator documents'},
  {'id': 'reports', 'title': 'Platform Reports', 'desc': 'View analytics and export data'},
  {'id': 'settings', 'title': 'Platform Settings', 'desc': 'Configure global platform preferences'}
]

base_dir = 'src/app/admin/users'
with open(os.path.join(base_dir, 'UsersClient.tsx'), 'r', encoding='utf-8') as f:
    client_template = f.read()

for p in pages:
    page_id = p['id']
    title = p['title']
    desc = p['desc']
    
    dir_path = os.path.join('src/app/admin', page_id)
    os.makedirs(dir_path, exist_ok=True)
    
    component_name = page_id.capitalize() + 'Client'
    
    page_tsx = f"""import {{ {component_name} }} from './{component_name}';
import {{ Metadata }} from 'next';

export const metadata: Metadata = {{
  title: '{title} - Equiplink Admin',
  description: '{desc}',
}};

export default function Page() {{
  return <{component_name} />;
}}
"""
    with open(os.path.join(dir_path, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(page_tsx)
        
    active_label = 'Verification' if page_id == 'verification' else page_id.capitalize()
    
    new_client = client_template.replace('export function UsersClient', f'export function {component_name}')
    new_client = new_client.replace('Users Management', title)
    new_client = new_client.replace("href: '/admin/users', active: true", "href: '/admin/users'")
    new_client = new_client.replace(f"href: '/admin/{page_id}'", f"href: '/admin/{page_id}', active: true")
    new_client = new_client.replace('No users found', f'No {page_id} found')
    new_client = new_client.replace('There are no registered users', f'There are no {page_id}')
    
    with open(os.path.join(dir_path, f'{component_name}.tsx'), 'w', encoding='utf-8') as f:
        f.write(new_client)
    print(f'Created {page_id}')
