import axiosInstance from '../utils/axiosInstance';

const COMPANY_ULR = '/api/companies/companies/';

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

  async getCompanies(page = 1) {
    try {
      const response = await axiosInstance.get(COMPANY_ULR, {
        params: { page },
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
};

export default CompanyService;
