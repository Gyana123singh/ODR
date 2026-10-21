import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

import sys
sys.stdout.reconfigure(encoding='utf-8')
stdin, stdout, stderr = ssh.exec_command('cat /var/www/odr-landingpage/dist/index.html')
print(stdout.read().decode('utf-8', errors='ignore'))
