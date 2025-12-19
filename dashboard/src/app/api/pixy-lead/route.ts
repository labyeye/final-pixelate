import { NextResponse } from 'next/server'
import * as svc from '@/lib/services'

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS() {
  return new NextResponse(null, { headers: CORS })
}

// Public endpoint for Pixy chatbot leads (no auth required)
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.name || !body.email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400, headers: CORS }
      )
    }

    const col = await svc.getCollection('leads')

    // Check if lead already exists
    const existingLead = await col.findOne({
      $or: [
        { email: body.email },
        { phone: body.phone }
      ]
    })

    const leadData = {
      name: body.name,
      email: body.email,
      phone: body.phone || null,
      source: 'pixy-chatbot',
      serviceType: body.service_type || null,
      projectType: body.project_type || null,
      websiteType: body.website_type || null,
      numberOfPages: body.number_of_pages || null,
      videoQuantity: body.video_quantity || null,
      videoType: body.video_type || null,
      videoBudget: body.video_budget || null,
      duration: body.duration || null,
      platform: body.platform || null,
      userCount: body.user_count || null,
      addons: body.addons || [],
      timeline: body.timeline || null,
      negotiationRequested: body.negotiation_requested || false,
      conversationHistory: body.conversation_history || [],
      status: 'new',
      priority: body.timeline === 'urgent' || body.negotiation_requested ? 'high' : 'medium',
      assignedTo: null,
      notes: `Pixy Chatbot Lead - ${body.service_type || 'Unknown'} service - ${body.project_type || 'Unknown'} project${body.negotiation_requested ? ' [NEGOTIATION REQUESTED]' : ''}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    if (existingLead) {
      // Update existing lead with new conversation
      const existingHistory = existingLead.conversationHistory || []
      const newHistory = [...existingHistory, ...(body.conversation_history || [])]
      
      await col.updateOne(
        { _id: existingLead._id },
        {
          $set: {
            ...leadData,
            conversationHistory: newHistory,
            updatedAt: new Date(),
            notes: `${existingLead.notes}\n\n[Updated via Pixy] ${leadData.notes}`,
          },
        }
      )

      return NextResponse.json(
        {
          success: true,
          message: 'Lead updated successfully',
          leadId: existingLead._id,
        },
        { headers: CORS }
      )
    } else {
      // Create new lead
      const result = await col.insertOne(leadData)

      return NextResponse.json(
        {
          success: true,
          message: 'Lead created successfully',
          leadId: result.insertedId,
        },
        { status: 201, headers: CORS }
      )
    }
  } catch (e: any) {
    console.error('Pixy lead submission error:', e)
    return NextResponse.json(
      { error: e.message || 'Internal server error' },
      { status: 500, headers: CORS }
    )
  }
}
