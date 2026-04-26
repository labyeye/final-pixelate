import { NextRequest, NextResponse } from 'next/server';
import * as svc from '@/lib/services';

export async function GET() {
  try {
    const col = await svc.getCollection('emi');
    const items = await col.find().sort({ createdAt: -1 }).toArray();
    return NextResponse.json(items);
  } catch (e: any) {
    console.error('Error fetching EMIs', e);
    return NextResponse.json({ error: e.message || 'Failed to fetch EMIs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const col = await svc.getCollection('emi');

    const totalAmount = Number(body.totalAmount || 0);
    const downPayment = Number(body.downPayment || 0);
    const emiAmount = Number(body.emiAmount || 0);
    const totalMonths = Number(body.totalMonths || 0);
    const startDate = body.startDate || new Date().toISOString().slice(0, 10);

    
    const schedule = [];
    const start = new Date(startDate);
    for (let i = 0; i < totalMonths; i++) {
      const dueDate = new Date(start.getFullYear(), start.getMonth() + i, start.getDate());
      schedule.push({
        month: i + 1,
        dueDate: dueDate.toISOString().slice(0, 10),
        amount: emiAmount,
        status: 'pending', 
        paidOn: null,
        note: '',
      });
    }

    const doc = {
      itemName: body.itemName || '',
      category: body.category || 'other',
      vendor: body.vendor || '',
      totalAmount,
      downPayment,
      loanAmount: totalAmount - downPayment,
      emiAmount,
      totalMonths,
      interestRate: Number(body.interestRate || 0),
      startDate,
      paymentMethod: body.paymentMethod || '',
      note: body.note || '',
      schedule,
      paidMonths: 0,
      status: 'active', 
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const res = await col.insertOne(doc);
    return NextResponse.json({ ...doc, _id: res.insertedId }, { status: 201 });
  } catch (e: any) {
    console.error('Error creating EMI', e);
    return NextResponse.json({ error: e.message || 'Failed to create EMI' }, { status: 500 });
  }
}
