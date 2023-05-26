function FormatResponse(response) {
    let updatedResponse;
    let imageUrl;
    const linkRegex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#\-\s]*[\w@?^=%&\/~+#-])/;
    const match = response.match(linkRegex);
  
    if (!match) {
      updatedResponse = response;
    } else {
      const imageUrlRegExp = /(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/i;
      const imageUrlMatch = response.match(imageUrlRegExp);
  
      if (imageUrlMatch) {
        imageUrl = imageUrlMatch[0];
      }
  

    const linkRegex = /(\b(?:https?|ftp):\/\/\S+\b)/gi;
    const anchorRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*?>.*?<\/a>/gi;
    
    updatedResponse = response.replace(linkRegex, (match) => {
      if (!anchorRegex.test(match)) {
        // Not a valid anchor tag, convert to anchor tag
        return `<a href="${match}" target="_blank" style="text-decoration: underline; color: #0096FF;">${match}</a>`;
      } else {
        // Already a valid anchor tag, leave it unchanged
        return match;
      }
    });
    
    }
  
    return {
      updatedResponse,
      imageUrl,
    };
  }
  
  export default FormatResponse;
  