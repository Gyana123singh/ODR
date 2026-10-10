import paramiko
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')
stdin, stdout, stderr = ssh.exec_command("curl -s -H 'Host: utkalodr.com' http://127.0.0.1/ | head -n 15")
print(stdout.read().decode())
ssh.close()
