import paramiko
from scp import SCPClient
import shutil
import os

print("Zipping dist folder...")
if os.path.exists('dist.zip'):
    os.remove('dist.zip')
shutil.make_archive('dist', 'zip', 'dist')

print("Connecting to VPS...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

print("Uploading dist.zip...")
scp = SCPClient(ssh.get_transport())
scp.put('dist.zip', '/var/www/odr-landingpage/dist.zip')
scp.close()

print("Unzipping on server...")
stdin, stdout, stderr = ssh.exec_command('cd /var/www/odr-landingpage/ && unzip -o dist.zip -d dist && rm dist.zip')
print(stdout.read().decode())
print(stderr.read().decode())

print("Restarting nginx...")
ssh.exec_command("systemctl restart nginx")
ssh.close()

print("Deployed successfully!")
