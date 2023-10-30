# Setting up and Running the App

## 1. Setup Static Content

First, you can just head to the [src/html](src/html) directory. To serve your static HTML contents, execute the following command:

```python3 -m http.server 8282```


## 2. Configure Database Connection
Adjust the [connection string](https://github.com/binoyskumar92/atlas-search-demo/blob/845c4458850c1cda5482a2dac73e57ccda24f2c6/search-backend.js#L9C26-L9C100) located in `search-backend.js` to correspond with your cluster link.

## 3. Index Creation
Establish a search index for the `sample_mflix.movies` collection. If you'd like to switch to a different collection, you can change it [here](https://github.com/binoyskumar92/atlas-search-demo/blob/845c4458850c1cda5482a2dac73e57ccda24f2c6/search-backend.js#L24). Please update rest of the app logic too as it assumes movies collection. Create a default index as well as an index specifically for 'plot' field named as plot.

## 4. Launching the Backend
To get the backend server up and running, use:

```node search-backend.js```

## 5. Launcing UI
Run ```localhost:8282``` and access the index.html file to load the search UI
