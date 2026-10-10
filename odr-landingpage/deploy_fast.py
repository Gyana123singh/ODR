import paramiko
from scp import SCPClient
import os

print("Connecting to VPS...")
ssh = paramiko.SSHClient()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

scp = SCPClient(ssh.get_transport())

local_dist = "d:\\ODR\\odr-landingpage\\dist"
remote_dist = "/var/www/odr-landingpage/dist"

def upload_fast(scp, local_path, remote_path):
    for item in os.listdir(local_path):
        s = os.path.join(local_path, item)
        d = os.path.join(remote_path, item).replace("\\", "/")
        if os.path.isdir(s):
            ssh.exec_command(f'mkdir -p "{d}"')
            upload_fast(scp, s, d)
        else:
            if s.endswith('.html') or s.endswith('.js') or s.endswith('.css'):
                print(f"Uploading {s} to {d}")
                scp.put(s, d)

upload_fast(scp, local_dist, remote_dist)
scp.close()

print("Restarting nginx...")
ssh.exec_command("systemctl restart nginx")
ssh.close()
print("Fast deployment complete!")
