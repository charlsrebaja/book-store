import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = session.user as any;
    if (user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const [totalBooks, totalOrders, totalUsers, orderStats] = await Promise.all([
      prisma.book.count(),
      prisma.order.count(),
      prisma.user.count(),
      prisma.order.aggregate({
        _sum: {
          total: true,
        },
      }),
    ]);

    const totalRevenue = orderStats._sum.total || 0;

    return NextResponse.json({
      totalBooks,
      totalOrders,
      totalUsers,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}