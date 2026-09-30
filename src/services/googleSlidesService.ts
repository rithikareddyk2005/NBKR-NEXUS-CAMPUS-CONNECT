export interface GoogleSlidePresentationItem {
  id: string;
  name: string;
  modifiedTime?: string;
  webViewLink?: string;
  thumbnailLink?: string;
  slideCount?: number;
}

export interface GooglePresentationDetails {
  presentationId: string;
  title: string;
  slides?: Array<{
    objectId: string;
    pageElements?: any[];
  }>;
}

export const googleSlidesService = {
  /**
   * List Google Slides presentations from user's Google Drive
   */
  async listPresentations(accessToken: string): Promise<GoogleSlidePresentationItem[]> {
    const url = "https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.presentation' and trashed=false&fields=files(id,name,modifiedTime,webViewLink,thumbnailLink)&pageSize=25&orderBy=modifiedTime desc";
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to fetch presentations: ${res.statusText}`);
    }

    const data = await res.json();
    return data.files || [];
  },

  /**
   * Get detailed slides and structure for a specific presentation
   */
  async getPresentation(accessToken: string, presentationId: string): Promise<GooglePresentationDetails> {
    const url = `https://slides.googleapis.com/v1/presentations/${presentationId}`;
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json'
      }
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to retrieve presentation: ${res.statusText}`);
    }

    return await res.json();
  },

  /**
   * Create a new Google Slides presentation
   */
  async createPresentation(accessToken: string, title: string): Promise<{ presentationId: string; title: string }> {
    const url = 'https://slides.googleapis.com/v1/presentations';
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to create presentation: ${res.statusText}`);
    }

    return await res.json();
  },

  /**
   * Append a structured slide to an existing presentation using batchUpdate
   */
  async addSlide(
    accessToken: string,
    presentationId: string,
    slideTitle: string,
    bodyText: string
  ): Promise<any> {
    const pageId = `slide_${Date.now()}`;
    const titleBoxId = `title_${Date.now()}`;
    const bodyBoxId = `body_${Date.now()}`;

    const requests = [
      {
        createSlide: {
          objectId: pageId,
          insertionIndex: 1,
          slideLayoutReference: {
            predefinedLayout: 'TITLE_AND_BODY'
          }
        }
      }
    ];

    const url = `https://slides.googleapis.com/v1/presentations/${presentationId}:batchUpdate`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ requests })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error?.message || `Failed to add slide: ${res.statusText}`);
    }

    return await res.json();
  }
};
