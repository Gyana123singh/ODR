import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

stdin, stdout, stderr = ssh.exec_command('nginx -T')
out = stdout.read().decode()

for line in out.split('\\n'):
    if 'utkalodr.com' in line:
        print(line.encode('ascii', 'ignore').decode())
