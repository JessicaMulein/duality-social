### OpenAI Integration

References: `/apps/duality-social-node/src/models/openAiGenerationResult.ts`, `/apps/duality-social-node/src/models/promptResultParser.ts`, `/apps/duality-social-node/src/services/openai.ts`

The key functionality related to integrating with the OpenAI API for text and image generation is provided in the following files:

- `/apps/duality-social-node/src/services/openai.ts`:

  - [`getOpenAIClient()`](/apps/duality-social-node/src/services/openai.ts#L106): Returns a configured [`OpenAIApi`](/apps/duality-social-node/src/services/openai.ts#L19) instance
  - [`createMaskPngDataUrl()`](/apps/duality-social-node/src/services/openai.ts#L44), [`getImageSizeFromImageDataUrl()`](/apps/duality-social-node/src/services/openai.ts#L62), [`createImageRequestSizeEnumToNumber()`](/apps/duality-social-node/src/services/openai.ts#L80), [`imageDataUrlToSizeAndFile()`](/apps/duality-social-node/src/services/openai.ts#L94): Utility functions for working with images
  - [`getOppositeResponseFromOpenAI()`](/apps/duality-social-node/src/services/openai.ts#L116): Generates text using the OpenAI API
  - [`generateDallEImage()`](/apps/duality-social-node/src/services/openai.ts#L177): Generates images using the OpenAI DALL-E API
  - [`runPrompt()`](/apps/duality-social-node/src/services/openai.ts#L213): Used to generate text and images for creating new posts

- `/apps/duality-social-node/src/models/openAiGenerationResult.ts`:

  - [`IOpenAIGenerationResult`](/apps/duality-social-node/src/models/openAiGenerationResult.ts#L3) interface: Defines the structure of the OpenAI API response
  - [`OpenAIGenerationResult`](/apps/duality-social-node/src/models/openAiGenerationResult.ts#L17) class: Encapsulates the OpenAI API response

- `/apps/duality-social-node/src/models/promptResultParser.ts`:
  - [`promptResultParser()`](/apps/duality-social-node/src/models/promptResultParser.ts#L7): Parses the response from an OpenAI generation request and creates an [`OpenAIGenerationResult`](/apps/duality-social-node/src/models/openAiGenerationResult.ts#L17) object
