import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

config = '''server {
    listen 80;
    listen 443 ssl; # managed by Certbot
    
    server_name utkalodr.com www.utkalodr.com 191.215.37.241;
    
    root /var/www/odr-landingpage/dist;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }

    ssl_certificate /etc/letsencrypt/live/utkalodr.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/utkalodr.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}
'''

sftp = ssh.open_sftp()
with sftp.file('/etc/nginx/sites-available/utkalodr.com', 'w') as f:
    f.write(config)

ssh.exec_command('systemctl restart nginx')
print('Nginx fixed properly and escaped')
