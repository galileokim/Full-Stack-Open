```mermaid
sequenceDiagram
    participant browser
    participant server

    Note right of browser: The browser sends JSON data of the form after clicking save
    browser->>server: POST https://fullstack-exampleapp.herokuapp.com/new_note
    Note right of browser: Rather than asking for new website data with GET request, the website uses JS on frontend to update notes. 