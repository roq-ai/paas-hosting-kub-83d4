import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { clusterValidationSchema } from 'validationSchema/clusters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.cluster
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getClusterById();
    case 'PUT':
      return updateClusterById();
    case 'DELETE':
      return deleteClusterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClusterById() {
    const data = await prisma.cluster.findFirst(convertQueryToPrismaUtil(req.query, 'cluster'));
    return res.status(200).json(data);
  }

  async function updateClusterById() {
    await clusterValidationSchema.validate(req.body);
    const data = await prisma.cluster.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteClusterById() {
    const data = await prisma.cluster.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
