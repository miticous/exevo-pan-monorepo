# Exevo Pan 🍎

[Exevo Pan](https://www.exevopan.com/) is an official [Tibia](https://www.tibia.com/) supported fansite focused on improving your Char Bazaar experience.

<p align="center">
    <img alt="Exevo Pan" src="https://i.imgur.com/0x3ZPkF.png">
</p>

# What's inside?

This monorepo contains the entire codebase of our project. Here is the anatomy:

```
├── automations
├── apps
│   ├── bazaar-scraper
│   ├── current-auctions-worker
│   ├── exevo-pan
│   └── history-server
├── packages
│   ├── auction-queries
│   ├── config
│   ├── data-dictionary
│   ├── logging
│   ├── mock-maker
│   ├── shared-utils
│   ├── tsconfig
│   └── @types
└── package.json
```

The entire stack is built using `typescript`, so you will need `Node.js` and `yarn`. If you are starting from a fresh clone of this repository, start with:
```bash
yarn
```

This will install and build all the `apps` dependencies. You will also need to install Workers CLI:

```bash
yarn global add @cloudflare/wrangler
```

## Apps

- [exevo-pan](apps/exevo-pan): the frontend application, built with `React`
- [bazaar-scraper](apps/bazaar-scraper): a custom built tool for scraping Char Bazaar data from the official [Tibia](https://www.tibia.com/) website
- [current-auctions-worker](apps/current-auctions-worker): a [Cloudflare Worker](https://workers.cloudflare.com/) that serves current auctions data
- [history-server](apps/history-server): an `Express` webserver responsible for serving past auctions data

# Setup

It's advisible that you read every app documentation before trying to run the full stack. Still, here is a simple recipe for you to get started:

## Install all the dependencies
```
yarn && yarn build:packages
```

## Scraping current auctions data

At the `apps/bazaar-scraper` directory, run:
```
yarn scrap:auctions
```

to get current auctions data. Then, fetch for highlighted auctions:
```
yarn update:highlighted
```

## Scraping history auctions data

To get some history auction data, start with:
```
yarn scrap:history
```

Scraping the entire History data will take several days, but you can skip this process as soon as `HistoryAuctions.jsonl` has been outputted.

Now generate some history statistics data using:
```
yarn update:statistics
```

#
At this point, your `apps/bazaar-scraper/Output` directory should have this set of data:

```
├── CurrentAuctions.json
├── HighlightedAuctions.json
├── HistoryAuctions.jsonl
├── HistoryStatistics.json
├── ItemsData.json
├── ScrapHistoryData.json
└── ServerData.json
```

#

Now you are ready to have a minimal dev enviroment! Go back to the repository root directory and run:
```
yarn dev
```

Now you are ready to roll! Apps will be running on:
- **exevo-pan**: [http://localhost:3000](http://localhost:3000)
- **current-auctions-worker**: [http://localhost:8787](http://localhost:8787)
- **history-server**: [http://localhost:4000](http://localhost:4000)
- **static-data-server**: [http://localhost:5555](http://localhost:5555)
