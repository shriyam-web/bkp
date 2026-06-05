import dbConnect from '@/lib/mongodb';
import CommitteeMember from '@/models/CommitteeMember';

export interface SerializedBoothMember {
  _id: string;
  name: { en: string; hi: string };
  position: { en: string; hi: string };
  image?: string | null;
  isBoothIncharge?: boolean;
  state?: string;
  constituency?: string;
  booth?: string;
  mobileNumber?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };
}

export async function getBoothMemberById(
  id: string
): Promise<SerializedBoothMember | null> {
  await dbConnect();
  const member = await CommitteeMember.findOne({ _id: id, type: 'BOOTH' }).lean();
  if (!member) return null;

  return {
    _id: String(member._id),
    name: member.name,
    position: member.position,
    image: member.image,
    isBoothIncharge: member.isBoothIncharge,
    state: member.state,
    constituency: member.constituency,
    booth: member.booth,
    mobileNumber: member.mobileNumber,
    address: member.address,
  };
}
