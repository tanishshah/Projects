#tanish shah

#importing libraries
import requests
from mpl_toolkits.basemap import Basemap 
import matplotlib.pyplot as plt 


breaker = input("would you like to map the coordinates: Yes or No? ").upper() #used to loop the program 

while breaker == "YES":
    
#data processing
    request = requests.get('http://api.open-notify.org/iss-now.json')#getting info from the api
    data = str(request.text)#storing the info in the data variable
    splitData = data.split('"') #split the list based on quotes

    num = [1,1]#array which will hold the longitude and lattitude values
    y =0 #used to iterate throught the listData to get floats
    passes = 0 #used as a placeholder

    for x in splitData: 
        try: 
            num[y] = float(x)
            y= y+1
        except:
            passes = passes+1 #this is just so I can use the try except

    latIndex = splitData.index('latitude')
    lonIndex = splitData.index('longitude')

    if lonIndex < latIndex:
        lon = float(num[0])
        lat = float(num[1])
    elif latIndex < lonIndex:
        lon = float(num[1])
        lat = float(num[0])
    else:
        print("something went wrong")

    print(lon)
    print(lat)



#setting up the map
    m = Basemap(projection ='mill') #miller projection which is for visualising the world, different ways of doing distortions and stuff
    m.drawcoastlines()
    m.drawcountries(linewidth=0.5)
    plt.title('ISS TRACKER') #giving the plot a title


#converting the data
    x, y = m(lon, lat)
    m.plot(x, y, "ro", markersize=5)#plotting a red circle where the ISS is
    print(request.status_code)
    plt.show() # calling the plot to show
#ending the program 
    breaker = input("would you like to continue? Yes or no? ").upper()

