import axiosInstance from '../utils/axiosInstance';

const COMPANY_ULR = '/api/companies/companies/';
const USERS_INVITATION_ULR = '/api/users/invitations/';
const USERS_REQUEST_URL = '/api/users/requests/';
const OWNER_INVITATION_URL = '/api/companies/invitations/';
const OWNER_REQUEST_URL = '/api/companies/requests/';

const CompanyService = {
  async createCompany(data) {
    try {
      const response = await axiosInstance.post(COMPANY_ULR, data);
      return response.data;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  },

  async getCompanies(page = 1, owner_id = null) {
    try {
      const response = await axiosInstance.get(COMPANY_ULR, {
        params: { page, owner_id },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error;
    }
  },

  async getCompanyById(id) {
    try {
      const response = await axiosInstance.get(`${COMPANY_ULR}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching company:', error);
      throw error;
    }
  },

  async updateCompany(id, data) {
    try {
      const response = await axiosInstance.put(`${COMPANY_ULR}${id}/`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating company:', error);
      throw error;
    }
  },

  async deleteCompany(id) {
    try {
      const response = await axiosInstance.delete(`${COMPANY_ULR}${id}/`);
      return response.data;
    } catch (error) {
      console.error('Error deleting company:', error);
      throw error;
    }
  },

  async getCompaniesByUserId(userId) {
    try {
      const response = await axiosInstance.get(COMPANY_ULR, {
        params: { member_id: userId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching companies by user ID:', error);
      throw error;
    }
  },

  async companyLeave(companyId) {
    try {
      const response = await axiosInstance.patch(
        `${COMPANY_ULR}${companyId}/leave/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error leaving company:', error);
      throw error;
    }
  },

  async companyRemoveMember(companyId, member) {
    try {
      const response = await axiosInstance.patch(
        `${COMPANY_ULR}${companyId}/remove_member/`,
        {
          member: member,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error removing member from company:', error);
      throw error;
    }
  },

  async sendInvitation(data) {
    try {
      const response = await axiosInstance.post(
        `${OWNER_INVITATION_URL}`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error sending invitation:', error);
      throw error;
    }
  },

  async revokeInvitation(invitationId) {
    try {
      const response = await axiosInstance.patch(
        `${OWNER_INVITATION_URL}${invitationId}/revoke`,
      );
      return response.data;
    } catch (error) {
      console.error('Error revoking invitation:', error);
      throw error;
    }
  },

  async cancelInvitation(invitationId) {
    try {
      const response = await axiosInstance.delete(
        `${OWNER_INVITATION_URL}${invitationId}/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error canceling invitation:', error);
      throw error;
    }
  },

  async getInvitations(receiverId, senderId) {
    try {
      const response = await axiosInstance.get(`${USERS_INVITATION_ULR}`, {
        params: { receiver: receiverId, sender: senderId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching invitations:', error);
      throw error;
    }
  },

  async acceptInvitation(invitationId) {
    try {
      const response = await axiosInstance.patch(
        `${USERS_INVITATION_ULR}${invitationId}/accept/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error accepting invitation:', error);
      throw error;
    }
  },

  async declineInvitation(invitationId) {
    try {
      const response = await axiosInstance.patch(
        `${USERS_INVITATION_ULR}${invitationId}/decline/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error canceling invitation:', error);
      throw error;
    }
  },

  async getRequestsCompany(senderId, companyId) {
    try {
      const response = await axiosInstance.get(`${OWNER_REQUEST_URL}`, {
        params: { sender: senderId, company: companyId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
  },

  async getRequestsUser(senderId) {
    try {
      const response = await axiosInstance.get(`${USERS_REQUEST_URL}`, {
        params: { sender: senderId },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching request user:', error);
      throw error;
    }
  },

  async sendRequest(data) {
    try {
      const response = await axiosInstance.post(`${USERS_REQUEST_URL}`, data);
      return response.data;
    } catch (error) {
      console.error('Error sending request:', error);
      throw error;
    }
  },

  async cancelRequest(requestId) {
    try {
      const response = await axiosInstance.patch(
        `${USERS_REQUEST_URL}${requestId}/cancel/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error canceling request:', error);
      throw error;
    }
  },

  async approveRequest(requestId) {
    try {
      const response = await axiosInstance.patch(
        `${OWNER_REQUEST_URL}${requestId}/approve/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error accepting request:', error);
      throw error;
    }
  },

  async rejectRequest(requestId) {
    try {
      const response = await axiosInstance.patch(
        `${OWNER_REQUEST_URL}${requestId}/reject/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error rejecting request:', error);
      throw error;
    }
  },

  async appointAdmin(data) {
    try {
      const response = await axiosInstance.patch(
        `${COMPANY_ULR}${data.company_id}/appoint-admin/`,
        {
          user: data.user_id,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error appointing admin:', error);
      throw error;
    }
  },

  async removeAdmin(data) {
    try {
      const response = await axiosInstance.patch(
        `${COMPANY_ULR}${data.company_id}/remove-admin/`,
        {
          user: data.user_id,
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error removing admin:', error);
      throw error;
    }
  },

  async getLastTakenQuizzesTime(companyId) {
    try {
      const response = await axiosInstance.get(
        `${COMPANY_ULR}${companyId}/last-completions-users/`,
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching last taken quizzes time:', error);
      throw error;
    }
  },

  async getLastTakenUserTime(userId) {
    try {
      const response = await axiosInstance.get(
        `${COMPANY_ULR}last-completions-quizzes/`,
        {
          params: { user: userId },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching last taken user time:', error);
      throw error;
    }
  },

  async geCompanyUsersResults(fileFormat, companyId, userId = null) {
    try {
      const response = await axiosInstance.get(
        `${COMPANY_ULR}${companyId}/export-company-results/`,
        {
          params: {
            ...(userId && { user: userId }),
            file_format: fileFormat,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching company users results:', error);
      throw error;
    }
  },
};

export default CompanyService;
