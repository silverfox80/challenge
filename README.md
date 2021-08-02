# Setup of the DEV environment

by Fabiano Sbaratta

Tested on:
OS Ubuntu 20.04.2 LTS - 64 bit - 16Gb RAM

## Installing NodeJs NPM Typescript
sudo apt udpate
sudo apt install nodejs npm node-typescript

## Installing DOCKER
sudo apt install docker.io

## Installing MINIKUBE (kubernates)
sudo apt install apt-transport-https curl

wget https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64

chmod +x minikube-linux-amd64

sudo mv minikube-linux-amd64 /usr/local/bin/minikube

(actual minikube version ### v1.21.0)

## Installing KUBECTL (kubernates command-line tool)
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl

chmod +x kubectl

sudo mv kubectl  /usr/local/bin/

( kubectl version -o json ### v1.21.2)

## Installing Docker Machine KVM Driver
curl -LO https://storage.googleapis.com/minikube/releases/latest/docker-machine-driver-kvm2

chmod +x docker-machine-driver-kvm2

sudo mv docker-machine-driver-kvm2 /usr/local/bin/

## Set-up minikube with KVM
sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils virt-manager

sudo addgroup libvirt

sudo usermod -aG libvirt $USER

newgrp libvirt

minikube config set vm-driver kvm2

## Installing Skaffold 
#### to automatize tasks in a Kubernates env. (like update code in a running pod)
curl -Lo skaffold https://storage.googleapis.com/skaffold/releases/latest/skaffold-linux-amd64

chmod +x skaffold

sudo mv skaffold /usr/local/bin/

# RUNNING THE ENVIRONMENT #
### Start minikube 
minikube start

#### Configure the  Ingress add-on to manage external access to the services in a cluster and load balancing features (see attached doc Ingress.odg) 
minikube addons enable ingress

### Set a secret on kubernates to store the jwt key
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=****

### Create a persistent volume
kubectl apply -f PROJECT-FOLDER/infrastructure/pv/pv-volume.yaml 
#### - check with "kubectl get pv task-pv-volume"

### Create a peristent volume claim
kubectl apply -f PROJECT-FOLDER/infrastructure/pv/pv-claim.yaml
#### - check again with "kubectl get pv task-pv-volume" that the status is "bound"
#### - "kubectl get pvc task-pv-claim" will show the claim bounded to the volume

### Launch Skaffold 
skaffold dev

#### - check with "kubectl get ing" and "kubectl get pods -n kube-system | grep nginx-ingress-controller"
#### - the host later created emmachallenge.dev in /etc/hosts must point to the load balancer IP received from kubectl command
#### - Some useful commands -
####
####   minikube addons list
####   minikube config view
####   kubectl get pv,pvc
####   kubectl describe pv,pvc
####   kubectl delete pvc --all 
####   kubectl port-forward api-mongo-depl-0 27017:27017