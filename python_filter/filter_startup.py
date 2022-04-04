# currently doesnt take into account if startup and investor endorse each_other
# just realised that if they endorse each_other and we reccomend it,
# its a conflict of interest :(

# i have no idea if it works

# also adjust the names according to the database
# also how can we call this function file ?
# from where will we get the startup / investor id

import pymongo
import pandas as pd

def get_database():

    CONNECTION = "mongodb://localhost:27017/"
    client = pymongo.MongoClient(CONNECTION)
    return client["startup-incubator"]


db = get_database()

col_startup = db["startup"]
col_investor = db["investor"]

query_startup = col_startup.find()
query_investor = col_investor.find()

# dataframe of the data
df_startup = pd.DataFrame(query_startup)
df_investor = pd.DataFrame(query_investor)

# now the filtering code

# from where will we get this id from ?
myStartup_id = 0

# jaccard_similarity with all other startups
startup_scores = [[-1, df_startup['id'][i]] for i in range(len(df_startup['id']))]

temp_df = df_startup.where(df_startup['id'] == myStartup_id)
myStartup_type_set = set(temp_df['startup_type'])

for i in range(len(startup_scores)):
    startup_type_set = set(df_startup['startup_type'][i])
    startup_scores[i][0] = len(myStartup_type_set & startup_type_set)/len(myStartup_type_set | startup_type_set)

# get top 10 similar users (may include it-slef)
top = 10
startup_scores.sort()
if(len(startup_scores < 10)):
    top = len(startup_scores)

# get scores of top 10 investors based on startups
startup_vs_investor = [[[0, df_investor['id'][j]] for j in range(len(df_investor['id']))] for i in range(top) ]

for i in range(top):

    startup_id = startup_scores[i][1]
    temp_df = df_startup.where(df_startup['id'] == startup_id)
    preffered_investor_type_set = set(temp_df['preffered_investors'])
    startup_type_set = set(temp_df['startup_type'])

    for j in range(len(df_investor['id'])):

        score = 0
        preffered_startup_type_set = set(df_investor['preffered_startups'][j])
        investor_type_set = set(df_investor['investor_type'][j])

        # jaccard similarity
        score += len(preffered_startup_type_set & preffered_investor_type_set)/len(preffered_startup_type_set | preffered_investor_type_set)
        score += len(startup_type_set & investor_type_set)/len(startup_type_set | investor_type_set)
        score /= 2

        # # add some bias if favourites / bookmarked startups         
        # if(isfav(startup.id, investor.id)):
            #    score += 1  # plus or minus ? -> conflict or interest ?
        # if(isfav(investor.id, startup.id)):
        #        score += 1
        # score /= 3

        startup_vs_investor[i][j][0] = score
    startup_vs_investor[i] = startup_vs_investor.sort()

reccomended = []
for i in range(top):
    reccomended.append(startup_vs_investor[i][0][1])
reccomended = list(set(reccomended))
# now somehow export the data ? (should export ids of recommended startups?)