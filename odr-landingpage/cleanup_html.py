import paramiko

ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

# Delete HTML files in root
ssh.exec_command('find /var/www/odr-landingpage/ -maxdepth 1 -name "*.html" -type f -delete')

# Delete HTML files in dist except index.html
ssh.exec_command('find /var/www/odr-landingpage/dist/ -maxdepth 1 -name "*.html" ! -name "index.html" -type f -delete')

print('Cleaned up server HTML files')
