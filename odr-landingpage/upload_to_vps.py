import paramiko
from scp import SCPClient
import os
import sys

def create_ssh_client(server, port, user, password):
    client = paramiko.SSHClient()
    client.load_system_host_keys()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(server, port, user, password)
    return client

print("Connecting to VPS...")
ssh = create_ssh_client('191.215.37.241', 22, 'root', 'Yoga@1431430')
scp = SCPClient(ssh.get_transport())

video_path = "D:\\ODR\\odr-landingpage\\public\\assets\\Video Project 3.mp4"

# Let's ensure the target directory exists
print("Ensuring target directory exists...")
ssh.exec_command('mkdir -p /var/www/odr-landingpage/public/assets')

print("Uploading video...")
scp.put(video_path, '/var/www/odr-landingpage/public/assets/')
print("Upload complete!")

scp.close()
ssh.close()
