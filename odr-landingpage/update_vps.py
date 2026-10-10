import paramiko
import sys

def run_ssh_command(ssh, command):
    print(f"Running: {command}")
    stdin, stdout, stderr = ssh.exec_command(command)
    exit_status = stdout.channel.recv_exit_status()
    print("STDOUT:", stdout.read().decode())
    print("STDERR:", stderr.read().decode())
    return exit_status

print("Connecting to VPS...")
ssh = paramiko.SSHClient()
ssh.load_system_host_keys()
ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
ssh.connect('191.215.37.241', 22, 'root', 'Yoga@1431430')

run_ssh_command(ssh, "cd /var/www/odr-landingpage && git reset --hard && git pull origin main")
run_ssh_command(ssh, "cd /var/www/odr-landingpage && npm install && npm run build")

nginx_config = """server {
    listen 80 default_server;
    listen [::]:80 default_server;
    root /var/www/odr-landingpage/dist;
    index index.html;
    server_name _;
    location / {
        try_files $uri $uri/ /index.html;
    }
}"""
run_ssh_command(ssh, f"cat << 'EOF' > /etc/nginx/sites-available/default\n{nginx_config}\nEOF")
run_ssh_command(ssh, "systemctl restart nginx")

ssh.close()
