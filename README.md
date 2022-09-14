# 📅 CPEcalendar

This project allows you to sync your myCPE planning with Google Agenda and other calendars app using the iCalendar format !

If you've experienced using the myCPE you'll know why :)

## 🌌 Hosted

If you want to use this software without any setup you can use the hosted version.

```
https://3lc4vo.deta.dev/?email=your.name@cpe.fr&password=YOURPASSWORD
```

## 🏡 Setup a self-hosted instance

First install all dependencies using npm :

```bash
npm i
```

You can then configure on what port the HTTP server will be running in the "config.json" file :

```json
{
    "port": 3000,
    "retrieveWeeks": 4
}
```

And start the server using :

```bash
node index.js
```

The server will then be running on the defined port !

You'll be then able to import your calendar by using the following URL :

```
http://IP:PORT/?email=your.name@cpe.fr&password=YOURPASSWORD
```

## 🔎 How do I add the link to my calendar ?

Use a link to add a calendar on Google Agenda :

https://support.google.com/calendar/answer/37100?hl=en&co=GENIE.Platform%3DDesktop
