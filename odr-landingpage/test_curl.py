import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

stdin, stdout, stderr = ssh.exec_command('grep -rn "return 301" /etc/nginx/sites-available/')
print(stdout.read().decode())
