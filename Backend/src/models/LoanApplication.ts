import mongoose, { Document, Schema } from 'mongoose';

export interface ILoanApplication extends Document {
  // Personal Information
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus?: string;
  nationality?: string;

  // Contact Information
  email: string;
  primaryPhone: string;
  alternatePhone?: string;
  permanentAddress: string;
  district?: string;

  // Identification
  citizenshipNo: string;

  // Employment Information
  occupation: string;
  monthlyIncome: string;
  employerName?: string;
  totalIncome?: string;

  // Loan Information
  loanType: string;
  loanAmount: string;
  loanPurpose: string;
  loanTerm: string;
  preferredEMI?: string;

  // Uploaded Files
  profilePhoto?: string;
  citizenshipFront?: string;
  citizenshipBack?: string;
  incomeProof?: string;

  // Application Status
  status: 'pending' | 'under-review' | 'approved' | 'rejected';
  submittedAt: Date;
  updatedAt: Date;
}

const LoanApplicationSchema: Schema = new Schema(
  {
    // Personal Information
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String },
    nationality: { type: String, default: 'Nepali' },

    // Contact Information
    email: { type: String, required: true },
    primaryPhone: { type: String, required: true },
    alternatePhone: { type: String },
    permanentAddress: { type: String, required: true },
    district: { type: String },

    // Identification
    citizenshipNo: { type: String, required: true },

    // Employment Information
    occupation: { type: String, required: true },
    monthlyIncome: { type: String, required: true },
    employerName: { type: String },
    totalIncome: { type: String },

    // Loan Information
    loanType: { type: String, required: true },
    loanAmount: { type: String, required: true },
    loanPurpose: { type: String, required: true },
    loanTerm: { type: String, required: true },
    preferredEMI: { type: String },

    // Uploaded Files
    profilePhoto: { type: String },
    citizenshipFront: { type: String },
    citizenshipBack: { type: String },
    incomeProof: { type: String },

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
LoanApplicationSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.model<ILoanApplication>(
  'LoanApplication',
  LoanApplicationSchema
);