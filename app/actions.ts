/** @format */

"use client";

import {
  CreateCampaignInput,
  UpdateCampaignInput,
  CreateSegmentInput,
  UpdateSegmentInput,
} from "@/types/mailchimp";

async function fetchAPI(
  method: string,
  endpoint: string,
  body?: any
): Promise<any> {
  const response = await fetch("/api/mailchimp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ method, endpoint, body }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "An error occurred");
  }

  return response.json();
}

export async function validateCredentials(): Promise<boolean> {
  try {
    await fetchAPI("GET", "/ping");
    return true;
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
}

export async function getLists(): Promise<any> {
  return fetchAPI("GET", "/lists");
}

// Campaign Actions
export async function getCampaigns(): Promise<any> {
  return fetchAPI("GET", "/campaigns");
}

export async function getCampaign(id: string): Promise<any> {
  return fetchAPI("GET", `/campaigns/${id}`);
}

export async function createCampaign(
  campaign: CreateCampaignInput
): Promise<any> {
  return fetchAPI("POST", "/campaigns", campaign);
}

export async function updateCampaign(
  id: string,
  updates: UpdateCampaignInput
): Promise<any> {
  return fetchAPI("PATCH", `/campaigns/${id}`, updates);
}

export async function deleteCampaign(id: string): Promise<any> {
  return fetchAPI("DELETE", `/campaigns/${id}`);
}

// Segment Actions
export async function getSegments(listId: string): Promise<any> {
  return fetchAPI("GET", `/lists/${listId}/segments`);
}

export async function getSegment(
  listId: string,
  segmentId: string
): Promise<any> {
  return fetchAPI("GET", `/lists/${listId}/segments/${segmentId}`);
}

export async function createSegment(
  listId: string,
  segment: CreateSegmentInput
): Promise<any> {
  return fetchAPI("POST", `/lists/${listId}/segments`, segment);
}

export async function updateSegment(
  listId: string,
  segmentId: string,
  updates: UpdateSegmentInput
): Promise<any> {
  return fetchAPI("PATCH", `/lists/${listId}/segments/${segmentId}`, updates);
}

export async function deleteSegment(
  listId: string,
  segmentId: string
): Promise<any> {
  return fetchAPI("DELETE", `/lists/${listId}/segments/${segmentId}`);
}

export async function replicateCampaign(campaignId: string): Promise<any> {
  return fetchAPI("POST", `/campaigns/${campaignId}/actions/replicate`);
}

export async function sendCampaign(campaignId: string): Promise<any> {
  return fetchAPI("POST", `/campaigns/${campaignId}/actions/send`);
}

export async function getCurrentCampaignData(campaignId: string): Promise<any> {
  return fetchAPI("GET", `/campaigns/${campaignId}`);
}
