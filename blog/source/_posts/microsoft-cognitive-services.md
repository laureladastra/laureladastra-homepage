---
title: Microsoft Cognitive Services - Getting Started
tags: []
categories: []
date: 2017-03-11 17:45:00
---

Microsoft has lately put more effort in providing resources to support the spike of interest in AI. It shows in the recent announcement about certification paths being upgraded to include [Data Science](https://academy.microsoft.com/en-us/professional-program/data-science/), the formation of the [Microsoft AI and Research Group](https://news.microsoft.com/2016/09/29/microsoft-expands-artificial-intelligence-ai-efforts-with-creation-of-new-microsoft-ai-and-research-group/#sm.0000v4w3gz167vehmqv096a67fwdw) and the release of new platform features on Azure to delve further into Machine Learning. <!-- more --> A specific service on Azure is interesting if you want to get started with implementing AI features in your applications without having to start from scratch. Microsoft Cognitive Services are a series of API's designated to tap into the power of AI. Its most prevalent API' s are Face, Emotion, Computer Vision, Cortana, Linguistic Analysis and Recommendation. My focus in this post goes to the Computer Vision API. Which provides the logic to extract information from images and process visual data. This post provides a brief introduction on how to get started. A Microsoft Azure tenant and a basic understanding of API's are required to get through.<br><br>

<h5>1. Setting up a Cognitive Services account</h5>
<br>{% image fancybox center fig-20 microsoft-cognitive-services-1.png %}

Go to the [Microsoft Azure Portal](portal.azure.com) and create a Cognitive Services Account through the Marketplace. Provide details in the service creation form for the subscription, resource group, location and pricing tier.<br><br>

<h5>2. Obtaining access keys from the Cognitive Services account</h5>
<br>{% image fancybox center microsoft-cognitive-services-2.png %}

Every call to Microsoft Cognitive Services is authorized by submitting a valid subscription key in the request header. Microsoft provides 2 keys for every account that can be regenerated in case of suspecting unauthorized access. The keys can be viewed by going to the properties page of the Cognitive Services account and selecting the Keys tab. Copy the value of the key you want to use in your requests to the API. Do not forget to store the keys safely.<br><br>

<h5>3. Viewing the methods of the Computer Vision API</h5>

The [API reference](<https://learn.microsoft.com/en-us/rest/api/computer-vision/?view=rest-computervision-v4.0-preview%20(2023-04-01)>) for the Computer Vision API provides a clear overview of the methods that are available for usage. It is currently possible to provide image descriptions in full English sentences and analyse whether an image contains mature content. There are additional methods that offer image categorization and color estimation features. The most important thing to keep in mind when using the API is the fact that images have to fulfill certain requirements in order to receive a successful response. Supported methods to upload an image include a URL, an application/octet stream or raw binary input. Images must be less than 4MB in size and the accepted formats are JPEG, PNG, GIF or BPM. The dimension of the image must be greater than 50 x 50 pixels.<br><br>

<h5>4. Submitting requests</h5>

Now that the basics of the Computer Vision API are in place, we can start submitting requests. The base URL for each request is *https://westus.api.cognitive.microsoft.com/vision/v1.0/*. I will use PowerShell to submit the HTTP requests, but any tool capable of sending and receiving data from a URI specified resource will suffice. I recommend [Postman](https://www.getpostman.com/) for those who are interested in having a graphical interface tailored for the purpose of working with API's. Let's start off with the Analyze Image method to receive information about the visual features of an image. The request will be composed of the following parts:<br>

**Request URL**<br>

<br>
{% image fancybox center microsoft-cognitive-services-3.png %}

**Request Parameters**

There are 3 optional parameters that can be used to extend the scope of the request. VisualFeatures represent a comma seperated string value indicating which visual features should be returned. Valid options are `categories, tags, description, faces, imagetype, color` and `adult` text. Details represents a string value indicating domain-specific details that should be returned. `Celebrities` is a valid option. Language represents a string value indicating in which language the response should be returned. `English (en)` and `Simplified Chinese` are valid options.

**Request Header**

The request header contains key-value pairs for `content-type` and `ocp-apim-subscription-key`. Content-Type sets the media type of the body sent to the API. Ocp-Apim-Subscription-Key specifies the subscription key used to authorize access to the Computer Vision API. The subscription key can also be passed through a query string parameter as opposed to in the request header.

**Request Body**

The request body contains a reference to the image that should be processed. The URL or raw image binary can be specified in the form of application/json, application/octet-stream or multipart/form-data. I will take the following image of the Matrix clan as a reference for the first request.
<br><br>{% image fancybox center matrix-clan.jpg %}<br><br>

When we glue the aforementioned parts together, the request will look as follows in PowerShell:<br><br>

```powershell
$ImageURL = @{url = 'http://orig00.deviantart.net/49b1/f/2011/355/d/c/dccf616fc52081963d49583541671eed-d4jr18e.jpg'} | ConvertTo-Json
$OCPKey = 'YOUR SUBSCRIPTION KEY'
(Invoke-RestMethod -Method Post -Uri 'https://westus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Color,Description&details=Celebrities' -ContentType $ContentType -Headers @{'ocp-apim-subscription-key' = $OCPKey; 'content-type' = 'application/json'} -Body $ImageURL) | ConvertTo-Json
```

The API will reply with a response of the following format:<br><br>

```json
{
  "categories": [
    {
      "name": "people_",
      "score": 0.765625,
      "detail": {
        "celebrities": [
          {
            "name": "Carrie-Anne Moss",
            "faceRectangle": {
              "left": 331,
              "top": 296,
              "width": 230,
              "height": 230
            },
            "confidence": 0.980940044
          },
          {
            "name": "Laurence Fishburne",
            "faceRectangle": {
              "left": 1217,
              "top": 174,
              "width": 230,
              "height": 230
            },
            "confidence": 0.9975896
          }
        ]
      }
    }
  ],
  "description": {
    "tags": [
      "person",
      "outdoor",
      "building",
      "standing",
      "woman",
      "posing",
      "man",
      "couple",
      "holding",
      "photo",
      "wearing",
      "sunglasses",
      "people",
      "glasses",
      "front",
      "black",
      "suit",
      "white",
      "brick",
      "street",
      "shirt",
      "young",
      "red",
      "city",
      "group"
    ],
    "captions": [
      {
        "text": "Carrie-Anne Moss, Laurence Fishburne et al. are posing for a picture",
        "confidence": 0.728383696145843
      }
    ]
  },
  "requestId": "a6eff003-ed33-4e33-bd61-e10505f01e2b",
  "metadata": {
    "width": 1920,
    "height": 1080,
    "format": "Jpeg"
  },
  "color": {
    "dominantColorForeground": "Black",
    "dominantColorBackground": "Black",
    "dominantColors": ["Black", "Grey"],
    "accentColor": "171212",
    "isBWImg": false
  }
}
```

<br>Although some of the tags are not entirely correct, the API managed to recognise the faces of Carrie-Anne Moss and Laurence Fishburne. The dominant colors in the image are black, grey and brown. The caption is 'Carrie-Anne Moss, Laurence Fishburne et al. are posing for a picture'. Referenced tags include glasses, bricks and suit. The results sound satisfying.<br><br>

<h5>5. Conclusion</h5>
While utilizing the Computer Vision API, I discovered flaws and half-truths in relation to tagging and description values. 30 percent of my images were incorrectly labeled out of a batch of 30 randomly picked images. Some results were even quite hilarious:

<br>{% image fancybox center microsoft-cognitive-services-4.png %}

It doesn't take a lot of requests to discover that tags are generalized and static. You will often see the following keywords appear with little contextual meaning: `young, phone, sitting, flying, standing, man`. Despite occasional inaccuracy, Cognitive Services is still a great collection of API's to bootstrap AI in applications. Taking its ease of implementation, cost (free under 5000 monthly calls) and span (24 API's categorized under Vision, Speech, Language, Knowledge and Search) into account, I would recommend it to anyone starting out with AI interested in getting more insight into the algorithms that are currently powering commercial use cases.
