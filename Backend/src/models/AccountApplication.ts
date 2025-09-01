import mongoose, { Document, Schema } from 'mongoose';

export interface IAccountApplication extends Document {
  // Personal Information
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus?: string;
  nationality: string;
  religion?: string;

  // Contact Information
  email: string;
  primaryPhone: string;
  alternatePhone?: string;
  permanentAddress: string;
  temporaryAddress?: string;
  district: string;
  municipality?: string;
  wardNo?: string;

  // Identification
  citizenshipNo?: string;
  passportNo?: string;
  panNo?: string;

  // Employment Information
  occupation: string;
  employerName?: string;
  monthlyIncome: string;
  incomeSource?: string;

  // Family Information
  fatherName?: string;
  motherName?: string;
  spouseName?: string;

  // Emergency Contact
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;

  // Account Details
  accountType: string;
  initialDeposit: string;
  depositFrequency?: string;

  // Nominee Information
  nomineeName?: string;
  nomineeRelation?: string;
  nomineePhone?: string;
  nomineeAddress?: string;

  // References
  reference1Name?: string;
  reference1Phone?: string;
  reference1Address?: string;
  reference2Name?: string;
  reference2Phone?: string;
  reference2Address?: string;

  // Uploaded Files
  profilePhoto?: string;
  citizenshipFront?: string;
  citizenshipBack?: string;
  passport?: string;
  panCard?: string;
  incomeProof?: string;
  bankStatement?: string;
  nomineePhoto?: string;

  // Application Status
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  submittedAt: Date;
  updatedAt: Date;
}

const AccountApplicationSchema: Schema = new Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String },
    nationality: { type: String, required: true, default: 'Nepali' },
    religion: { type: String },

    // Contact Information
    email: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    alternatePhone: { type: String },
    permanentAddress: { type: String, required: true },
    temporaryAddress: { type: String },
    district: { type: String, required: true },
    municipality: { type: String },
    wardNo: { type: String },

    // Identification
    citizenshipNo: { type: String },
    passportNo: { type: String },
    panNo: { type: String },

    // Employment Information
    occupation: { type: String, required: true },
    employerName: { type: String },
    monthlyIncome: { type: String, required: true },
    incomeSource: { type: String },

    // Family Information
    fatherName: { type: String },
    motherName: { type: String },
    spouseName: { type: String },

    // Emergency Contact
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
    emergencyContactRelation: { type: String },

    // Account Details
    accountType: { type: String, required: true },
    initialDeposit: { type: String, required: true },
    depositFrequency: { type: String },

    // Nominee Information
    nomineeName: { type: String },
    nomineeRelation: { type: String },
    nomineePhone: { type: String },
    nomineeAddress: { type: String },

    // References
    reference1Name: { type: String },
    reference1Phone: { type: String },
    reference1Address: { type: String },
    reference2Name: { type: String },
    reference2Phone: { type: String },
    reference2Address: { type: String },

    // Uploaded Files
    profilePhoto: { type: String },
    citizenshipFront: { type: String },
    citizenshipBack: { type: String },
    passport: { type: String },
    panCard: { type: String },
    incomeProof: { type: String },
    bankStatement: { type: String },
    nomineePhoto: { type: String },

    // Application Status
    status: {
      type: String,
      enum: ['pending', 'under-review', 'approved', 'rejected'],
      default: 'pending',
    },
    submittedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

// Update the updatedAt field before saving
AccountApplicationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<IAccountApplication>(
  'AccountApplication',
  AccountApplicationSchema
);