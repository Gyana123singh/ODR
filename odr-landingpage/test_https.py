import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

stdin, stdout, stderr = ssh.exec_command('curl -sL --insecure https://127.0.0.1/index.html -H "Host: utkalodr.com" | head -n 20')
print(stdout.read().decode())
