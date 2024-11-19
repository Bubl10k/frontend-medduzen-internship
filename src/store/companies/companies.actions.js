import { createAsyncThunk } from '@reduxjs/toolkit';
import CompanyService from '../../services/company.service';

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async (page, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getCompanies(page);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const createCompany = createAsyncThunk(
  'companies/createCompany',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.createCompany(data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchCompanyById = createAsyncThunk(
  'companies/fetchCompanyById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getCompanyById(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const updateCompany = createAsyncThunk(
  'companies/updateCompany',
  async (data, { rejectWithValue }) => {
    try {
      const response = await CompanyService.updateCompany(data.id, data);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const deleteCompany = createAsyncThunk(
  'companies/deleteCompany',
  async (id, { rejectWithValue }) => {
    try {
      const response = await CompanyService.deleteCompany(id);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);

export const fetchCompaniesByUserId = createAsyncThunk(
  'companies/fetchCompaniesByUserId',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await CompanyService.getCompaniesByUserId(userId);
      return response.results;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
