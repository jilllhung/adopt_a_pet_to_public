# Where's My Human (adopt_a_pet)

Where's My Human is a pet adoption website where humans can find their pets.  
It is a platform that can showcase pets available for adoption from multiple sources, including the [RescueGroups.org API](https://userguide.rescuegroups.org/display/APIDG/API+Developers+Guide+Home).   
There are a number of websites out there that provide adoption services. We want to build a website that gather adoptable pets across platforms at one place, making it easier and faster for potential adopters, relieving adopters to seach multiple websites.  
There is also the additonal feature to upload a house pet that is in need for adoption, so the pet might not need to go through shelters before being adopted.  

The frontend uses React, while the backend uses Spring MVC with a MySQL database.  

## Roadmap
- Call the APIs daily for updates on available pets.
- Implement the feature to retrieve from multiple sources. (Currently only retrieving from RescueGroups API)

## Installation
1. Make sure you have [Node.js](https://nodejs.org/en/) installed.  
2. Install [Maven](https://maven.apache.org/download.cgi).  
3. Navigate into the `client` folder, use the Node Package Manager(NPM) to install node modules  
```bash
cd client
npm install
```

## Usage
To start the React frontend:  
Navigate into the `client` folder and use NPM to start the app.  
```bash
cd client
npm start
```
To start the Spring backend:  
Navigate to the `adopt_a_pet` folder
```bash
cd adopt_a_pet
mvn spring-boot:run
```
