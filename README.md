# Image Listing App

This is an Image Gallery app built with React and Chakra UI. It allows users to search for photos using keywords and displays the results in an infinite scroll grid layout. The app fetches images from the Flickr API and provides a smooth and responsive user experience.

### Live Link
[Take me to the deployed app](https://image-listing.vercel.app/)

### Demo
[](https://github.com/Varu98/image-listing/assets/69509962/f9b79dab-5b9e-40e6-a199-2d85eecc65eb)



## Table of Contents

- [Image Listing App](#image-listing-app)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Folder Structure](#folder-structure)
  - [Dependencies](#dependencies)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Search for photos using keywords
- Infinite scroll grid layout to display the images
- Modal view to display the selected image in a larger size
- Cached search history for quicker access to previous searches

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/image-gallery-app.git
   ```

2. Change to the project directory:

   ```bash
   cd image-gallery-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

## Usage

1. Obtain an API key from [Flickr API](https://www.flickr.com/services/api/).
2. Rename the `.env.example` file to `.env` and replace `<YOUR_API_KEY>` with your actual API key.
3. Start the development server:

   ```bash
   npm start
   ```

4. Open your browser and visit `http://localhost:3000` to view the app.

## Folder Structure

The project's folder structure is as follows:

```plaintext
image-gallery-app/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── cards/
│   │   │   └── ImageCard.js
│   │   ├── inputs/
│   │   │   └── Search.js
│   │   ├── layout/
│   │   │   └── Layout.js
│   │   ├── loaders/
│   │   │   └── Loading.js
│   │   └── modals/
│   │       └── ImageModal.js
│   ├── contexts/
│   │   └── useImages.js
│   ├── App.js
│   └── index.js
├── .env.example
├── .gitignore
├── package.json
├── README.md
└── ...
```

## Dependencies

The app relies on the following dependencies:

- `@chakra-ui/react`: Provides the UI components and theming for the app.
- `axios`: Handles HTTP requests to fetch data from the Flickr API.
- `react-infinite-scroll-component`: Implements the infinite scroll functionality.
- `lodash`: Provides utility functions, such as debouncing search requests.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
