import paramiko
from scp import SCPClient
import os

def create_ssh_client(server, port, user, password):
    client = paramiko.SSHClient()
    client.load_system_host_keys()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(server, port, user, password)
    return client

def upload_folder(scp, local_path, remote_path):
    for item in os.listdir(local_path):
        s = os.path.join(local_path, item)
        d = os.path.join(remote_path, item).replace("\\", "/")
        if os.path.isdir(s):
            try:
                ssh.exec_command(f'mkdir -p "{d}"')
            except Exception:
                pass
            upload_folder(scp, s, d)
        else:
            scp.put(s, d)

print("Connecting to VPS...")
ssh = create_ssh_client('191.215.37.241', 22, 'root', 'Yoga@1431430')
scp = SCPClient(ssh.get_transport())

local_dist = "D:\\ODR\\odr-landingpage\\dist"
remote_dist = "/var/www/odr-landingpage/dist"

print("Creating remote directory if not exists...")
ssh.exec_command(f'mkdir -p {remote_dist}')

print("Uploading dist folder...")
upload_folder(scp, local_dist, remote_dist)

print("Upload complete! Restarting nginx...")
ssh.exec_command("systemctl restart nginx")

scp.close()
ssh.close()
