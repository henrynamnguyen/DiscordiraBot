# Discordira
Submission for Atlassian Codegeist 2021 Hackathon: https://devpost.com/software/discordira
Discorira Bot to add to your channel : https://discord.com/oauth2/authorize?client_id=880612199893188638&permissions=0&scope=bot%20applications.commands

# Pain point
Discord has exploded in popularity amongst chat platforms because it is free, fast and has strong screen and audio sharing features (arguably even better than Slack or Microsoft Teams). Thus many businesses and small teams have switched to Discord as a means of internal collaboration or a means to communicate with their customers.

Back in my university day, when I was working at an IT helpdesk at my school, it is very difficult for students or anyone on campus to contact us conveniently. They have to walk to our desks to request our help or send us an email. This is a long process and so, people were very lazy to contact us and just left their problems as it was. We constantly find ways to help people contact us and the solution was to make a Discord channel in our school Discord server. Why? Because almost all of our students have Discord account while almost none of them used Slack, Teams or bothered to use phones or emails. Our customer response rate improved dramatically since making this Discord channel. I was personally tasked with administering our Discord channel and notifying our agents to solve customers' problems. We also used Jira Service Desk as collaboration tool and a part of my duty is to copy & paste students' problems into Jira tickets for the team. This is a very frustrating and repetitive task for me!

For startups, Discord was chosen because it is free (startups always need cost-cutting!) and we found out that the developer community consists of mostly young developers who always prefer Discord to other chat platforms. They use Discord to do customer support, customer survey and bug reports and Jira for collaborating and the same situation back in university day came back to me again. That's when I realize I desperately need a ticketing system that can sync between Discord and Jira!

When asking my friends in the industry, I notice that more and more of their companies today are using Discord as their main communication tool or at least transitioning to it. Most of these companies also use Jira like our team and I find it somewhat surprising that on the Atlassian marketplace, there is ZERO app to connect Discord to Jira or Confluence. Doing a simple search for "Discord" on Atlassian Community https://community.atlassian.com/t5/forums/searchpage/tab/message?q=Discord&collapse_discussion=true&search_type=thread there are 15 posts regarding Discord. This proves that there is a real need for a Discord extenstion for Atlassian softwares!

# What it does
Discordira synchronizes tickets made in Discord with issues in in Jira, allowing company agents to reply to customers without transitioning between the two apps.

# How we built it
Discordira relied heavily on Forge webtrigger, product trigger modules and fetch api.

# Challenges we ran into
How to associate a Discord channel with an Atlassian account. Also, use DynamoDB in Forge is difficult.

# Accomplishments that we're proud of
I am able to make this work!!!

# What we learned
I learned so much about Jira, Forge and how to make a ticketing system.
