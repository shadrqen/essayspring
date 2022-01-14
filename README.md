<h1 align="center">
  <br>
  <a href="https://essayspring.com" target="_blank"><img src="https://raw.githubusercontent.com/shadrqen/essayspring/main/client/static/icon.png" height="256px" width="256px"></a>
  <br>
  EssaySpring
  <br>
</h1>

<h4 align="center">Get your order done in record time, plagiarism and grammar error-free</h4>

<p align="center">
<a href="https://github.com/shadrqen/essayspring/actions" target="_blank" rel="noopener noreferrer"><img src="https://github.com/shadrqen/essayspring/actions/workflows/ci.yml/badge.svg?branch=main" ></a>
<a href="https://github.com/shadrqen/essayspring/actions" target="_blank" rel="noopener noreferrer"><img src="https://github.com/shadrqen/essayspring/actions/workflows/docker-publish-latest.yml/badge.svg?branch=main" ></a>
</p>

<p align="center">
<a href="https://essayspring.com" target="_blank" rel="noopener noreferrer">EssaySpring</a> •
<a href="https://writeray.com" target="_blank" rel="noopener noreferrer">Writeray</a> •
</p>


## EssaySpring
#### About
<b> EssaySpring </b> is a freelance academic writing platform that provides (clients) access to a select pool of highly-qualified professionals from a wide array of fields.
It allows clients to post tasks/assignments to and receive completed copies within a set timeline - plagiarism and grammar-error free. Payments are made automatically through M-PESA
(a Kenyan mobile phone-based money transfer and payments service), and updated real-time using MQTT. The professionals can be either public (seen by all clients) or private (only visible
to a client).

#### Development
The platform has been on development for quite a while under private repos. However, I have moved a majority of the functionalities here to be open-source.
While I believe the idea and its implementation could be of high value to me, I feel like it would even be more should we join hands together as a community.
The project has been running under a beta release for quite some time now. There are still areas of improvement, and your contribution is highly welcome and appreciated as we make the 
world a better place - one open-source contribution at a time.

#### Writeray
<b>Writeray</b> is the professional service/platform that allows them to register, before being vetted carefully to ensure only the best get to handle the client orders.
It is currently running under a different altogether, but shares the DBMS microservice and the database. Plans are underway to integrate the same here.

## Structure
The platform is decoupled into three modules.
- Client
  > The front-end or clientside of the application
- Server
  > The back-end or serverside of the application
- DBMS
  > The database microservice.

## Integration
Currently, the client-facing platform (EssaySpring) has been integrated successfully. The next step is to integrate the professional-facing side (Writeray).

## Core Features
- **Post orders 24/7** - Post your order any time of the day/week
- **Pay instantly and manage your finances** - Make instant payments, add funds to your account, release payments on order completion and track your spending
- **Manage your orders** - Keep track of the paper and have access to every bit throughout the writing process. Contact your writer and ask for change where necessary
- **Manage your writers** - Invite your private writers, have access to those who are best suited to handle the paper. Choose one that best satisfies your requirements

## Benefits
- **Professional writers** - Get access to our team of experienced and trusted professional writers to assist in your coursework
- **High quality** - High standards are applied to achieve the highest quality possible of your paper
- **Low cost** - Enjoy unbelievably low prices for your orders, ranging from writing, rewriting to editing.
- **24/7 Support** - Get access to instant support services every hour and day of the week
- **Boost your Grade** Improve your performance by receiving the ideal responses to your coursework

Installation
------------

#### Fork and clone

- Fork the repository
- Clone to your machine
```git clone https://github.com/[YOUR_USERNAME]/essayspring.git```

#### Dev Setup
For each of the five microservices, open and follow the steps (in each microservice README) to run the development setup


## Contributing

You can help out with the ongoing development by looking for potential bugs in our code base, or by contributing new features. We are always welcoming new pull requests containing bug fixes, refactors and new features. We have a list of tasks and bugs on our issue tracker on Github. Please comment on issues if you want to contribute with, to avoid duplicating effort.
Here's how:
- Fork the repository ([here is the guide](https://help.github.com/articles/fork-a-repo/)). 
- Clone to your machine ```git clone https://github.com/[YOUR_USERNAME]/essayspring.git```
- Make your changes
- Create a pull request


## Get in touch

<table>
  <tr>
    <td><a href="https://twitter.com/shadrqen">Twitter</a></td>
    <td>You can follow my Twitter account to get updates on new features or releases</td>
  </tr>
</table>

## License

Beginning with version 0.0.1, the code in this repository is licensed under the [GNU AGPL v3](https://www.gnu.org/licenses/agpl-3.0.de.html) license with a
[common clause](https://commonsclause.com/) selling exception. See [LICENSE.md](https://github.com/shadrqen/essayspring/blob/dev/LICENSE) for details.

